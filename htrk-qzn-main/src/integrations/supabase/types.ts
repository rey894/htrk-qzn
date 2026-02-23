export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string; // uuid
          user_id: string; // uuid (references auth.users.id)
          email: string;
          full_name: string | null;
          role: string;
          avatar_url: string | null;
          created_at: string; // timestamptz
          updated_at: string; // timestamptz
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          full_name?: string | null;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          full_name?: string | null;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          }
        ];
      };

      news: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          featured_image_url: string | null;
          status: "draft" | "published" | "archived";
          publish_date: string | null; // timestamptz
          category: string | null;
          tags: string[] | null;
          author_id: string | null; // uuid -> auth.users.id
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          featured_image_url?: string | null;
          status?: "draft" | "published" | "archived";
          publish_date?: string | null;
          category?: string | null;
          tags?: string[] | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          featured_image_url?: string | null;
          status?: "draft" | "published" | "archived";
          publish_date?: string | null;
          category?: string | null;
          tags?: string[] | null;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "news_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          }
        ];
      };

      documents: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string;
          department: string | null;
          file_url: string;
          file_type: string | null;
          file_size: number | null; // bigint -> number
          download_count: number;
          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category: string;
          department?: string | null;
          file_url: string;
          file_type?: string | null;
          file_size?: number | null;
          download_count?: number;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          department?: string | null;
          file_url?: string;
          file_type?: string | null;
          file_size?: number | null;
          download_count?: number;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          department: string | null;
          status:
            | "new"
            | "in_progress"
            | "resolved"
            | "closed"
            | "pending";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          department?: string | null;
          status?:
            | "new"
            | "in_progress"
            | "resolved"
            | "closed"
            | "pending";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          department?: string | null;
          status?:
            | "new"
            | "in_progress"
            | "resolved"
            | "closed"
            | "pending";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_date: string;
          end_date: string | null;
          location: string | null;
          featured_image_url: string | null;
          category: string | null;
          organizer: string | null;
          registration_required: boolean;
          max_participants: number | null;
          current_participants: number;
          status: "upcoming" | "ongoing" | "completed" | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          event_date: string;
          end_date?: string | null;
          location?: string | null;
          featured_image_url?: string | null;
          category?: string | null;
          organizer?: string | null;
          registration_required?: boolean;
          max_participants?: number | null;
          current_participants?: number;
          status?: "upcoming" | "ongoing" | "completed" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          event_date?: string;
          end_date?: string | null;
          location?: string | null;
          featured_image_url?: string | null;
          category?: string | null;
          organizer?: string | null;
          registration_required?: boolean;
          max_participants?: number | null;
          current_participants?: number;
          status?: "upcoming" | "ongoing" | "completed" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      bac_documents: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          document_type:
            | "invitation_to_bid"
            | "notice_of_award"
            | "contract_agreement";
          file_url: string;
          file_type: string | null;
          file_size: number | null;
          contractor_name: string | null;
          contract_amount: string | null; // numeric -> string to preserve precision
          contract_period_start: string | null; // date
          contract_period_end: string | null; // date
          deadline_date: string | null; // date
          status: "active" | "completed" | "archived";
          created_by: string | null; // uuid -> auth.users.id
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          document_type:
            | "invitation_to_bid"
            | "notice_of_award"
            | "contract_agreement";
          file_url: string;
          file_type?: string | null;
          file_size?: number | null;
          contractor_name?: string | null;
          contract_amount?: string | null;
          contract_period_start?: string | null;
          contract_period_end?: string | null;
          deadline_date?: string | null;
          status?: "active" | "completed" | "archived";
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          document_type?:
            | "invitation_to_bid"
            | "notice_of_award"
            | "contract_agreement";
          file_url?: string;
          file_type?: string | null;
          file_size?: number | null;
          contractor_name?: string | null;
          contract_amount?: string | null;
          contract_period_start?: string | null;
          contract_period_end?: string | null;
          deadline_date?: string | null;
          status?: "active" | "completed" | "archived";
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bac_documents_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          }
        ];
      };

      user_roles: {
        Row: {
          user_id: string;
          role: "admin" | "moderator" | "user";
          created_at: string | null;
        };
        Insert: {
          user_id: string;
          role: "admin" | "moderator" | "user";
          created_at?: string | null;
        };
        Update: {
          user_id?: string;
          role?: "admin" | "moderator" | "user";
          created_at?: string | null;
        };
        Relationships: [];
      };

      user_roles_audit: {
        Row: {
          id: string;
          operation: string;
          changed_at: string;
          actor_id: string | null;
          actor_role: string | null;
          row_before: Json | null;
          row_after: Json | null;
          ip_address: string | null;
          request_id: string | null;
          actor_email: string | null;
          tenant_id: string | null;
        };
        Insert: {
          id?: string;
          operation: string;
          changed_at?: string;
          actor_id?: string | null;
          actor_role?: string | null;
          row_before?: Json | null;
          row_after?: Json | null;
          ip_address?: string | null;
          request_id?: string | null;
          actor_email?: string | null;
          tenant_id?: string | null;
        };
        Update: {
          id?: string;
          operation?: string;
          changed_at?: string;
          actor_id?: string | null;
          actor_role?: string | null;
          row_before?: Json | null;
          row_after?: Json | null;
          ip_address?: string | null;
          request_id?: string | null;
          actor_email?: string | null;
          tenant_id?: string | null;
        };
        Relationships: [];
      };

      upload_events: {
        Row: {
          id: string;
          user_id: string;
          file_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      user_roles_role: "admin" | "moderator" | "user";
      news_status: "draft" | "published" | "archived";
      documents_status: "draft" | "published" | "archived";
      contact_messages_status:
        | "new"
        | "in_progress"
        | "resolved"
        | "closed"
        | "pending";
      events_status: "upcoming" | "ongoing" | "completed" | "cancelled";
      bac_documents_document_type:
        | "invitation_to_bid"
        | "notice_of_award"
        | "contract_agreement";
      bac_documents_status: "active" | "completed" | "archived";
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
}