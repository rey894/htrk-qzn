import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X, ChevronDown, ChevronUp, ChevronRight, GripVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useAuth } from '@/hooks/useAuth';

interface NavigationMenuItem {
  id: string;
  label: string;
  href: string;
  parent_id: string | null;
  menu_group: string;
  display_order: number;
  is_active: boolean;
  opens_in_new_tab: boolean;
  icon_name: string | null;
  description: string | null;
}

interface FlatNavigationItem extends NavigationMenuItem {
  level: number;
  children?: FlatNavigationItem[];
}

export function NavigationManager() {
  const { user } = useAuth();
  const [menuGroups, setMenuGroups] = useState<string[]>(['main']);
  const [selectedGroup, setSelectedGroup] = useState<string>('main');
  const [items, setItems] = useState<NavigationMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    label: '',
    href: '',
    parent_id: '',
    menu_group: 'main',
    display_order: 0,
    is_active: true,
    opens_in_new_tab: false,
    icon_name: '',
    description: ''
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; itemId: string | null }>({
    open: false,
    itemId: null
  });

  useEffect(() => {
    fetchItems();
    fetchMenuGroups();
  }, [selectedGroup]);

  const fetchMenuGroups = async () => {
    const { data } = await supabase
      .from('navigation_menu_items')
      .select('menu_group')
      .eq('is_active', true);
    
    if (data) {
      const uniqueGroups = Array.from(new Set(data.map(item => item.menu_group)));
      setMenuGroups(uniqueGroups.length > 0 ? uniqueGroups : ['main']);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('navigation_menu_items')
        .select('*')
        .eq('menu_group', selectedGroup)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching navigation items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch navigation items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      label: '',
      href: '',
      parent_id: '',
      menu_group: selectedGroup,
      display_order: items.length,
      is_active: true,
      opens_in_new_tab: false,
      icon_name: '',
      description: ''
    });
    setEditingId(null);
  };

  const buildHierarchy = (items: NavigationMenuItem[]): FlatNavigationItem[] => {
    const itemMap = new Map<string, FlatNavigationItem>();
    const rootItems: FlatNavigationItem[] = [];

    items.forEach(item => {
      itemMap.set(item.id, { ...item, level: 0, children: [] });
    });

    items.forEach(item => {
      const flatItem = itemMap.get(item.id)!;
      if (item.parent_id) {
        const parent = itemMap.get(item.parent_id);
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(flatItem);
          flatItem.level = (itemMap.get(item.parent_id)?.level || 0) + 1;
        }
      } else {
        rootItems.push(flatItem);
      }
    });

    const flatten = (items: FlatNavigationItem[], level = 0): FlatNavigationItem[] => {
      const result: FlatNavigationItem[] = [];
      items.forEach(item => {
        result.push({ ...item, level });
        if (item.children && item.children.length > 0) {
          result.push(...flatten(item.children, level + 1));
        }
      });
      return result;
    };

    return flatten(rootItems.sort((a, b) => a.display_order - b.display_order));
  };

  const handleCreate = async () => {
    if (!form.label || !form.href) {
      toast({
        title: "Error",
        description: "Label and href are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('navigation_menu_items')
        .insert({
          ...form,
          parent_id: form.parent_id || null,
          icon_name: form.icon_name || null,
          description: form.description || null,
          created_by: user?.id,
          updated_by: user?.id
        });

      if (error) throw error;
      toast({
        title: "Success",
        description: "Navigation item created successfully"
      });
      setIsCreating(false);
      resetForm();
      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create navigation item",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingId || !form.label || !form.href) {
      toast({
        title: "Error",
        description: "Label and href are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('navigation_menu_items')
        .update({
          ...form,
          parent_id: form.parent_id || null,
          icon_name: form.icon_name || null,
          description: form.description || null,
          updated_by: user?.id
        })
        .eq('id', editingId);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Navigation item updated successfully"
      });
      setEditingId(null);
      resetForm();
      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update navigation item",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('navigation_menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Navigation item deleted successfully"
      });
      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete navigation item",
        variant: "destructive"
      });
    }
  };

  const handleMoveOrder = async (id: string, direction: 'up' | 'down') => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const sortedItems = [...items].sort((a, b) => a.display_order - b.display_order);
    const currentIndex = sortedItems.findIndex(i => i.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sortedItems.length) return;

    const targetItem = sortedItems[newIndex];
    const newOrder = targetItem.display_order;
    const oldOrder = item.display_order;

    try {
      await supabase
        .from('navigation_menu_items')
        .update({ display_order: newOrder })
        .eq('id', id);
      
      await supabase
        .from('navigation_menu_items')
        .update({ display_order: oldOrder })
        .eq('id', targetItem.id);

      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to reorder items",
        variant: "destructive"
      });
    }
  };

  const startEdit = (item: NavigationMenuItem) => {
    setForm({
      label: item.label,
      href: item.href,
      parent_id: item.parent_id || '',
      menu_group: item.menu_group,
      display_order: item.display_order,
      is_active: item.is_active,
      opens_in_new_tab: item.opens_in_new_tab,
      icon_name: item.icon_name || '',
      description: item.description || ''
    });
    setEditingId(item.id);
    setIsCreating(false);
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const flatItems = buildHierarchy(items);
  const parentOptions = items.filter(item => !item.parent_id || item.id !== editingId);

  if (loading) {
    return <div>Loading navigation items...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Menu Group Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Menu Management</CardTitle>
          <CardDescription>
            Manage your website navigation menus. Create groups like "Main Menu", "Footer Menu", etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Label htmlFor="menu-group">Menu Group:</Label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {menuGroups.map(group => (
                  <SelectItem key={group} value={group}>
                    {group.charAt(0).toUpperCase() + group.slice(1)} Menu
                  </SelectItem>
                ))}
                <SelectItem value="__new__">+ Create New Group</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating || editingId !== null}>
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="Menu item label"
                />
              </div>
              <div>
                <Label htmlFor="href">URL/Link *</Label>
                <Input
                  id="href"
                  value={form.href}
                  onChange={(e) => setForm({ ...form, href: e.target.value })}
                  placeholder="/page or https://example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parent">Parent Item</Label>
                  <Select value={form.parent_id} onValueChange={(value) => setForm({ ...form, parent_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="None (Top Level)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None (Top Level)</SelectItem>
                      {parentOptions.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">Icon Name (optional)</Label>
                  <Input
                    id="icon"
                    value={form.icon_name}
                    onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
                    placeholder="e.g., home, info, services"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (optional)</Label>
                  <Input
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Tooltip text"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="opens_in_new_tab"
                    checked={form.opens_in_new_tab}
                    onChange={(e) => setForm({ ...form, opens_in_new_tab: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="opens_in_new_tab">Open in New Tab</Label>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button onClick={editingId ? handleUpdate : handleCreate}>
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update' : 'Create'} Item
              </Button>
              <Button variant="outline" onClick={() => { setIsCreating(false); resetForm(); }}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Menu Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items ({flatItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {flatItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No menu items. Click "Add Menu Item" to get started.</p>
            ) : (
              flatItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 p-3 border rounded-lg ${
                    item.level > 0 ? 'ml-6 bg-muted/50' : 'bg-background'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {item.children && item.children.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(item.id)}
                        className="h-6 w-6 p-0"
                      >
                        {expandedItems.has(item.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {!item.children && <div className="w-6" />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{item.label}</span>
                        {!item.is_active && <Badge variant="secondary">Inactive</Badge>}
                        {item.opens_in_new_tab && <Badge variant="outline">New Tab</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{item.href}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveOrder(item.id, 'up')}
                      disabled={item.display_order === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveOrder(item.id, 'down')}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => startEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteDialog({ open: true, itemId: item.id })}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, itemId: null })}
        onConfirm={async () => {
          if (deleteDialog.itemId) {
            await handleDelete(deleteDialog.itemId);
            setDeleteDialog({ open: false, itemId: null });
          }
        }}
        title="Delete Menu Item"
        description="Are you sure you want to delete this menu item? This will also delete all child items."
      />
    </div>
  );
}
