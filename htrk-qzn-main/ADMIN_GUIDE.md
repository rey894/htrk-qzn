# Admin Dashboard Guide - Municipality of Quezon, Bukidnon

## Overview

This guide will help you manage the municipal website content through the WordPress-like admin dashboard. The system is designed to be user-friendly and intuitive for non-technical staff.

## Accessing the Admin Dashboard

1. Navigate to `/auth` on the website
2. Sign in with your admin credentials
3. You'll be redirected to the admin dashboard

## Dashboard Sections

### 1. Dashboard Overview
- View statistics and quick overview of content
- See recent activity and pending items

### 2. News Management
**Create News Articles:**
- Click "New Article" button
- Fill in:
  - **Title**: Article headline
  - **Excerpt**: Brief summary (appears in listings)
  - **Content**: Full article text
  - **Category**: Organize by topic
  - **Featured Image URL**: Link to image (use Media Library)
  - **Status**: Draft (not published) or Published (visible on site)
- Click "Create" to save

**Edit/Delete:**
- Click the edit icon to modify existing articles
- Click the delete icon to remove articles
- Changes are saved immediately

### 3. Events Management
**Create Events:**
- Click "New Event"
- Fill in:
  - **Title**: Event name
  - **Description**: Event details
  - **Event Date**: When it starts
  - **End Date**: When it ends (optional)
  - **Location**: Where it's happening
  - **Category**: Type of event
  - **Featured Image**: Visual for the event
  - **Status**: Upcoming, Ongoing, or Past
- Save when done

### 4. Documents Management
**Upload Documents:**
- Click "New Document"
- Enter:
  - **Title**: Document name
  - **Description**: What the document is about
  - **Category**: Type of document
  - **Department**: Which office it belongs to
  - **File**: Upload PDF or other files (max 5MB)
- Set status to "Published" to make it visible

### 5. Media Library
**Upload Images/Files:**
- Click "Select File" to choose an image or file
- Add **Alt Text**: Description for accessibility (important for SEO)
- Add **Description**: Optional details
- Click "Upload File"
- Maximum file size: 10MB

**Using Media:**
- Click the copy icon to get the file URL
- Use this URL in News/Events featured images
- All uploaded media is stored securely

### 6. Contact Messages
**View Messages:**
- See all messages from the contact form
- Filter by status: Pending, Read, Replied
- Click to view full message details
- Update status as you handle messages

### 7. User Management (Admin Only)
**Add New Users:**
- Click "Add New User"
- Enter:
  - **Email**: User's email address
  - **Password**: Temporary password (user should change it)
  - **Full Name**: User's name
  - **Role**: 
    - **User**: Basic access
    - **Moderator**: Can edit content
    - **Admin**: Full access
    - **BAC**: Access to BAC documents only
- Click "Create User"

**Manage Users:**
- View all registered users
- Click edit icon to change user roles
- Delete users (removes access but keeps auth account)

**Note**: User creation sends a verification email. For immediate access without email verification, contact your technical administrator.

### 8. Settings
**Site Configuration:**
- **General**: Site name, description
- **Contact**: Email, phone, address
- **Social Media**: Facebook, Twitter, Instagram, YouTube URLs
- Make changes and click "Save All Changes"

### 9. BAC Documents (BAC Role)
**Upload BAC Documents:**
- Click "New Document"
- Select document type:
  - Invitation to Bid
  - Notice of Award
  - Contract Agreement
- Upload PDF file (max 5MB)
- Add title and description
- Save to publish

## Best Practices

### Content Management
1. **Always add Alt Text** to images for accessibility
2. **Use clear, descriptive titles** for better SEO
3. **Keep excerpts brief** (1-2 sentences)
4. **Categorize content** for better organization
5. **Save as Draft** first, then publish when ready

### Media Management
1. **Optimize images** before uploading (compress large files)
2. **Use descriptive filenames** (e.g., "mayor-announcement-2024.jpg")
3. **Add Alt Text** for all images
4. **Organize files** by creating folders in your mind (use naming conventions)

### User Management
1. **Create strong passwords** for new users
2. **Assign appropriate roles** (don't give admin to everyone)
3. **Regularly review** user list and remove inactive accounts
4. **Keep admin accounts secure**

### Security
1. **Never share your admin password**
2. **Log out** when finished
3. **Use strong passwords**
4. **Report suspicious activity** immediately

## Troubleshooting

### Can't Create User
- User creation requires email verification
- Check if email already exists
- For immediate access, contact technical administrator

### Can't Upload File
- Check file size (max 10MB for media, 5MB for documents)
- Ensure file type is allowed (images, PDFs, documents)
- Check internet connection

### Changes Not Showing
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check if content status is "Published"
- Verify you're viewing the correct page

### Forgot Password
- Use "Forgot Password" link on login page
- Check email for reset link
- Contact administrator if email not received

## Getting Help

For technical issues or questions:
1. Check this guide first
2. Contact your website administrator
3. Document the issue (screenshot, steps to reproduce)

## Quick Reference

| Action | Location |
|--------|----------|
| Create News | News → New Article |
| Upload Document | Documents → New Document |
| Upload Image | Media → Select File |
| View Messages | Messages |
| Add User | Users → Add New User |
| Change Settings | Settings → Save All Changes |
| Upload BAC Doc | BAC Documents → New Document |

---

**Last Updated**: January 2025
**Version**: 1.0
