# Managing Navigation Menus

The Quezon Municipal Website features a WordPress-like navigation management system that allows administrators to manage menu items directly from the admin dashboard.

## Overview

The navigation system supports:
- **Hierarchical Menus**: Create parent-child menu relationships
- **Menu Groups**: Organize menus by groups (main, footer, etc.)
- **Display Ordering**: Control the order of menu items
- **Active States**: Automatic highlighting of current page
- **External Links**: Support for opening links in new tabs

## Accessing Navigation Manager

1. Log in to the Admin Dashboard
2. Click **"Navigation"** in the sidebar menu
3. You'll see the Navigation Manager interface

## Creating a Menu Item

### Basic Menu Item

1. Click **"Add New Menu Item"** button
2. Fill in the form:
   - **Label**: Display text for the menu item (e.g., "About Quezon")
   - **Link/URL**: Destination URL (e.g., "/about" or "https://example.com")
   - **Menu Group**: Select "main" for main navigation
   - **Display Order**: Number to control position (1 = first, 2 = second, etc.)
   - **Open in New Tab**: Check if link should open in a new window
   - **Icon Name**: Optional icon identifier (uses Lucide icons)
   - **Description**: Optional description for reference
   - **Status**: Select "Active" to make it visible
3. Click **"Save"**

### Parent Menu Item (with Submenu)

1. Create the parent menu item first (e.g., "Governance")
2. After saving, click **"Add Submenu Item"** on the parent item
3. Fill in the submenu item form:
   - **Label**: Submenu text (e.g., "Mission & Vision")
   - **Link**: Destination URL (e.g., "/governance#mission")
   - **Parent**: Automatically set to the parent menu item
   - **Display Order**: Position within the submenu
4. Click **"Save"**

### Example: Creating a "Services" Menu with Submenu

```
Parent Menu Item:
  Label: "Services"
  Link: "/services"
  Display Order: 3

Submenu Items:
  - Label: "Business Permits", Link: "/services#business", Order: 1
  - Label: "Civil Registry", Link: "/services#civil", Order: 2
  - Label: "Building Permits", Link: "/services#building", Order: 3
```

## Editing Menu Items

1. Find the menu item in the Navigation Manager
2. Click the **Edit** icon (pencil) next to the item
3. Make your changes
4. Click **"Save"** to update

## Reordering Menu Items

1. Edit the menu item you want to move
2. Change the **Display Order** number
3. Lower numbers appear first (1 before 2, 2 before 3, etc.)
4. Click **"Save"**

**Tip**: Reorder multiple items by adjusting their Display Order numbers sequentially.

## Deleting Menu Items

1. Find the menu item in the Navigation Manager
2. Click the **Delete** icon (trash) next to the item
3. Confirm deletion

**Warning**: Deleting a parent menu item will also delete all its submenu items!

## Menu Groups

Menu groups allow you to organize menus for different areas:

- **main**: Main navigation menu (header)
- **footer**: Footer navigation (if applicable)
- **mobile**: Mobile-specific menu (if different from main)

To assign a menu item to a group:
1. Select the **Menu Group** dropdown when creating/editing
2. Choose the appropriate group
3. Save the item

## Common Menu Structures

### Main Navigation Example

```
1. Home (/)
2. About Quezon (/about)
   - Town Profile (/about#town-profile)
   - History (/about#history)
   - Municipal Seal (/about#municipal-seal)
3. Governance (/governance)
   - Mission & Vision (/governance#mission)
   - Development Agenda (/governance/development-agenda)
   - The Mayor (/governance/mayor)
   - Sangguniang Bayan (/governance/sangguniang-bayan)
   - Offices (/governance/offices)
4. Services (/services)
5. Investment (/investment)
6. Tourism (/tourism)
7. News (/news)
```

## Best Practices

### Menu Organization

- **Keep menus concise**: Limit main menu items to 5-7 items
- **Use clear labels**: Make menu item names descriptive and user-friendly
- **Logical grouping**: Group related items under parent menus
- **Consistent ordering**: Use sequential Display Order numbers

### Link Types

- **Internal Links**: Use relative paths (e.g., "/about", "/governance")
- **External Links**: Use full URLs (e.g., "https://example.com")
- **Anchor Links**: Use hash links for page sections (e.g., "/about#history")
- **New Tab Links**: Only use for external links that navigate away from the site

### Menu Status

- **Active**: Menu item is visible on the website
- **Inactive**: Menu item is hidden but can be reactivated later

Use **Inactive** status to temporarily hide menu items without deleting them.

## Troubleshooting

### Menu Item Not Appearing

- Check that **Status** is set to "Active"
- Verify **Menu Group** matches where you want it to appear
- Ensure **Display Order** is set (not blank)
- Check if there are any validation errors when saving

### Submenu Not Showing

- Ensure parent menu item exists and is Active
- Verify submenu items have the correct Parent selected
- Check Display Order for submenu items
- Refresh the website page after saving changes

### Menu Item in Wrong Position

- Adjust **Display Order** number
- Lower numbers appear before higher numbers
- Reorder all items using sequential numbers (1, 2, 3, etc.)

## Related Pages

- [Admin Dashboard Overview](Admin-Dashboard-Overview)
- [Getting Started](Getting-Started)

---

*For technical support, contact: business-dev@haturiko.com*
