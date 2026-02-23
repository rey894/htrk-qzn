# Editable Content Reference Table
## Municipality of Quezon, Bukidnon Website

This document maps all editable content areas, pages, sections, blocks, and fields for role assignment (Admin/BAC).

---

## GETTING STARTED

### For New Administrators

Welcome to the Municipality of Quezon, Bukidnon Content Management System! This guide will help you get started managing the website content.

#### First Steps

1. **Logging In**
   - Navigate to `/auth` on the website
   - Enter your admin credentials (provided by system administrator)
   - After successful login, you'll be redirected to the Admin Dashboard

2. **Understanding Your Role**
   - **Admin Role**: Full access to all content management features
   - **BAC Role**: Limited access to BAC Documents only
   - If you need additional permissions, contact your system administrator

3. **Dashboard Overview**
   - The dashboard provides quick statistics on:
     - Total news items (published and draft)
     - Total events (published and draft)
     - Total documents (published and draft)
     - Unread contact messages
   - Use the sidebar menu to navigate between different content sections

#### Common Tasks

**Publishing a News Article:**
1. Click "News" in the sidebar
2. Click "Create New" or "Add News"
3. Fill in the title, content, and upload a featured image
4. Set status to "Published"
5. Click "Save" or "Publish"

**Adding an Event:**
1. Click "Events" in the sidebar
2. Click "Create New" or "Add Event"
3. Enter event details (title, description, date, time, location)
4. Upload a featured image
5. Set status to "Published"
6. Click "Save" or "Publish"

**Uploading a Document:**
1. Click "Documents" in the sidebar
2. Click "Create New" or "Upload Document"
3. Enter document title and description
4. Upload the PDF/document file
5. Select category and file type
6. Set status to "Published"
7. Click "Save" or "Publish"

**Managing Contact Information:**
1. Click "Settings" in the sidebar
2. Navigate to the "Contact" tab
3. Update phone numbers, emails, and addresses as needed
4. Click "Save All Changes" at the top

#### Best Practices

- **Always Preview**: Use the "View Website" button to see how changes appear to visitors
- **Use Drafts**: Test content as "Draft" before publishing
- **Descriptive Titles**: Use clear, descriptive titles for all content
- **Image Optimization**: Compress images before uploading (recommended max 2MB)
- **Regular Updates**: Keep news and events current for better user engagement
- **Contact Information**: Ensure all contact details are accurate and up-to-date

#### Need Help?

- For technical issues, contact your system administrator
- For content questions, refer to the detailed sections below
- Check the role summary section to understand what you can edit

---

### For New Visitors

Welcome to the Municipality of Quezon, Bukidnon official website! This guide will help you navigate and find the information you need.

#### Finding Information

**Municipal Services:**
- Navigate to the "Services" page from the main menu
- Browse available services including:
  - Business Permits
  - Civil Registry
  - Building Permits
  - Social Assistance
  - Forms & Downloads
- Each service includes requirements and downloadable forms

**Contacting Municipal Offices:**
- **Emergency Hotlines**: Click the floating emergency button (red phone icon) on any page
  - Police: Available 24/7
  - Fire Department: Available 24/7
  - MDRRMO: Disaster response and emergency management
- **General Inquiries**: Use the "Contact Us" page to send a message
- **Office Locations**: Visit the "Offices" page under Governance section
- **Office Hours**: Typically Monday-Friday, 8:00 AM - 5:00 PM

**Latest Updates:**
- **News & Updates**: Check the homepage carousel for latest headlines
- **Events**: View upcoming municipal events and activities
- **Transparency**: Access public documents and financial reports under "Transparency"

#### Navigation Tips

**Main Menu Sections:**
- **Home**: Return to homepage
- **About Quezon**: Town profile, history, and municipal seal information
- **Governance**: Mission & Vision, Development Agenda, Mayor, Sangguniang Bayan, Offices
- **Services**: All municipal services and downloadable forms
- **Investment**: Investment opportunities and information
- **Tourism**: Destinations, activities, festivals, and travel guide
- **News**: Latest news and announcements

**Mobile Users:**
- Use the hamburger menu (☰) in the top right corner
- Tap parent menu items to navigate directly
- Tap the chevron (▼) next to parent items to expand submenus

**Quick Actions:**
- **Download Forms**: Visit Services → Forms & Downloads
- **Report Emergency**: Click the floating red emergency button
- **Contact Municipal Hall**: Use the Contact Us form or footer information
- **View Transparency Documents**: Navigate to Transparency section

#### Getting Assistance

**For General Inquiries:**
- Fill out the "Contact Us" form on the website
- Email: Check footer or top bar for current email address
- Phone: See contact information in footer or header

**For Specific Services:**
- Visit the Services page for detailed requirements
- Download required forms from the Forms & Downloads section
- Contact the specific office using information from the Offices page

**For Emergencies:**
- Use the floating emergency hotlines button
- Available 24/7 for Police, Fire, and Disaster Response
- Call directly using the displayed phone numbers

#### Useful Features

- **Responsive Design**: Website works on all devices (desktop, tablet, mobile)
- **Search**: Use browser search (Ctrl+F or Cmd+F) to find specific content
- **Print-Friendly**: Many pages can be printed directly from your browser
- **Accessibility**: Website follows accessibility standards for better usability

---

---

## 1. DASHBOARD OVERVIEW
**Location:** Admin Dashboard → Dashboard Tab  
**Role:** Admin Only  
**Purpose:** Statistics and overview

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Statistics | Dashboard Stats | News Count | View Only | Total published/draft news items |
| | | Events Count | View Only | Total published/draft events |
| | | Documents Count | View Only | Total published/draft documents |
| | | Messages Count | View Only | Total contact messages received |

---

## 2. NEWS MANAGEMENT
**Location:** Admin Dashboard → News Tab  
**Role:** Admin Only  
**Database Table:** `news`

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| News List | News Items | Title | ✅ Yes | News article title |
| | | Content/Body | ✅ Yes | News article content (rich text) |
| | | Excerpt | ✅ Yes | Short summary/description |
| | | Featured Image | ✅ Yes | Main image for the news item |
| | | Status | ✅ Yes | Published/Draft status |
| | | Category | ✅ Yes | News category/tag |
| | | Published Date | ✅ Yes | Publication date |
| | | Author | ✅ Yes | Author name |
| | | Slug | ✅ Yes | URL-friendly identifier |
| Actions | News Actions | Create | ✅ Yes | Create new news item |
| | | Edit | ✅ Yes | Edit existing news item |
| | | Delete | ✅ Yes | Delete news item |
| | | Publish/Unpublish | ✅ Yes | Toggle publication status |

---

## 3. EVENTS MANAGEMENT
**Location:** Admin Dashboard → Events Tab  
**Role:** Admin Only  
**Database Table:** `events`

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Events List | Event Items | Title | ✅ Yes | Event title |
| | | Description | ✅ Yes | Event description/content |
| | | Event Date | ✅ Yes | Date of the event |
| | | Start Time | ✅ Yes | Event start time |
| | | End Time | ✅ Yes | Event end time |
| | | Location | ✅ Yes | Event venue/location |
| | | Featured Image | ✅ Yes | Main image for the event |
| | | Status | ✅ Yes | Published/Draft status |
| | | Category | ✅ Yes | Event category/tag |
| Actions | Event Actions | Create | ✅ Yes | Create new event |
| | | Edit | ✅ Yes | Edit existing event |
| | | Delete | ✅ Yes | Delete event |
| | | Publish/Unpublish | ✅ Yes | Toggle publication status |

---

## 4. DOCUMENTS MANAGEMENT
**Location:** Admin Dashboard → Documents Tab  
**Role:** Admin Only  
**Database Table:** `documents`

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Documents List | Document Items | Title | ✅ Yes | Document title |
| | | Description | ✅ Yes | Document description |
| | | File Upload | ✅ Yes | PDF/document file |
| | | File Type | ✅ Yes | Document type/category |
| | | Category | ✅ Yes | Document category |
| | | Status | ✅ Yes | Published/Draft status |
| | | Published Date | ✅ Yes | Publication date |
| Actions | Document Actions | Create | ✅ Yes | Create new document |
| | | Edit | ✅ Yes | Edit document metadata |
| | | Delete | ✅ Yes | Delete document |
| | | Download | View Only | Download document file |
| | | Publish/Unpublish | ✅ Yes | Toggle publication status |

---

## 5. MEDIA LIBRARY
**Location:** Admin Dashboard → Media Tab  
**Role:** Admin Only  
**Database Table:** `media`

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Media Library | Media Items | File Upload | ✅ Yes | Upload images/videos/files |
| | | Title | ✅ Yes | Media file title |
| | | Alt Text | ✅ Yes | Alternative text for accessibility |
| | | Caption | ✅ Yes | Media caption/description |
| | | File Type | View Only | Image/Video/Document |
| | | File Size | View Only | File size in bytes |
| | | Upload Date | View Only | Date uploaded |
| Actions | Media Actions | Upload | ✅ Yes | Upload new media |
| | | Edit Metadata | ✅ Yes | Edit title, alt text, caption |
| | | Delete | ✅ Yes | Delete media file |
| | | View/Download | View Only | View or download file |

---

## 6. CONTACT MESSAGES
**Location:** Admin Dashboard → Messages Tab  
**Role:** Admin Only  
**Database Table:** `contact_messages`

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Messages List | Message Items | Name | View Only | Sender name |
| | | Email | View Only | Sender email |
| | | Subject | View Only | Message subject |
| | | Message | View Only | Message content |
| | | Received Date | View Only | Date received |
| | | Status | ✅ Yes | Read/Unread/Archived |
| Actions | Message Actions | View | View Only | View full message |
| | | Mark as Read/Unread | ✅ Yes | Update read status |
| | | Delete | ✅ Yes | Delete message |
| | | Reply | View Only | Reply via email |
| | | Archive | ✅ Yes | Archive message |

---

## 7. USER MANAGEMENT
**Location:** Admin Dashboard → Users Tab  
**Role:** Admin Only  
**Database Table:** `profiles`, `user_roles`

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Users List | User Items | Full Name | ✅ Yes | User's full name |
| | | Email | View Only | User email (from auth) |
| | | Role | ✅ Yes | Admin/BAC/User role |
| | | Status | ✅ Yes | Active/Inactive |
| Actions | User Actions | Create User | ✅ Yes | Create new user account |
| | | Edit User | ✅ Yes | Edit user details/roles |
| | | Delete User | ✅ Yes | Delete user account |
| | | Reset Password | ✅ Yes | Reset user password |

---

## 8. SITE SETTINGS
**Location:** Admin Dashboard → Settings Tab  
**Role:** Admin Only  
**Database Table:** `site_settings`

### 8.1. GENERAL SETTINGS
| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| General | Site Configuration | Site Title | ✅ Yes | Website title |
| | | Site Description | ✅ Yes | Website description/meta |
| | | Site Logo | ✅ Yes | Site logo upload |
| | | Copyright Text | ✅ Yes | Footer copyright text |

### 8.2. CONTACT INFORMATION
| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Contact | General Contact | Email | ✅ Yes | General contact email |
| | | Phone | ✅ Yes | General contact phone |
| | | Address | ✅ Yes | Municipal address |
| Emergency | Police | Phone Number | ✅ Yes | Police hotline number |
| | | Email | ✅ Yes | Police email |
| | Fire | Phone Number | ✅ Yes | Fire hotline number |
| | | Email | ✅ Yes | Fire email |
| | MDRRMO | Phone Number | ✅ Yes | MDRRMO hotline number |
| | | Email | ✅ Yes | MDRRMO email |
| Office | Health Center | Phone Number | ✅ Yes | Health center phone |
| | | Email | ✅ Yes | Health center email |

### 8.3. SOCIAL MEDIA
| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Social Links | Social Media | Facebook URL | ✅ Yes | Facebook page URL |
| | | Twitter URL | ✅ Yes | Twitter profile URL |
| | | Instagram URL | ✅ Yes | Instagram profile URL |
| | | YouTube URL | ✅ Yes | YouTube channel URL |

### 8.4. SERVICES PAGE
| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| Services | Office Hours | Days | ✅ Yes | Office hours (days of week) |
| | | Time | ✅ Yes | Office hours (time range) |
| | Location | Address | ✅ Yes | Office location address |
| | | Postal Code | ✅ Yes | Postal code |
| | Contact | Phone | ✅ Yes | Services phone number |
| | | MDRRMO Phone | ✅ Yes | MDRRMO phone for services |

---

## 9. BAC DOCUMENTS
**Location:** Admin Dashboard → BAC Documents Tab  
**Role:** BAC Role (and Admin)  
**Database Table:** `bac_documents`

| Section | Block | Field | Editable | Description |
|---------|-------|-------|----------|-------------|
| BAC Documents List | Document Items | Title | ✅ Yes | BAC document title |
| | | Description | ✅ Yes | Document description |
| | | File Upload | ✅ Yes | PDF/document file |
| | | Document Type | ✅ Yes | BAC document type/category |
| | | Reference Number | ✅ Yes | BAC reference/document number |
| | | Date | ✅ Yes | Document date |
| | | Status | ✅ Yes | Published/Draft status |
| Actions | BAC Document Actions | Create | ✅ Yes | Create new BAC document |
| | | Edit | ✅ Yes | Edit BAC document |
| | | Delete | ✅ Yes | Delete BAC document |
| | | Download | View Only | Download document file |
| | | Publish/Unpublish | ✅ Yes | Toggle publication status |

---

## ROLE SUMMARY

### ADMIN ROLE
Has access to ALL sections:
- ✅ Dashboard Overview
- ✅ News Management
- ✅ Events Management
- ✅ Documents Management
- ✅ Media Library
- ✅ Contact Messages
- ✅ User Management
- ✅ Site Settings
- ✅ BAC Documents (view and edit)

### BAC ROLE
Has access to:
- ✅ BAC Documents Management (full access)
- ❌ All other sections (no access)

---

## NOTES

1. **Design Elements:** Most design elements (colors, layouts, component structures) are NOT editable through the admin interface. These require code changes.

2. **Content Areas:** Only content stored in the database (news, events, documents, settings) is editable through the admin dashboard.

3. **Static Content:** Some page content (e.g., "About Quezon" sections, "History", "Municipal Seal" descriptions) may need to be made editable in future updates.

4. **File Size Limits:** Document/media uploads may have size limits (e.g., 5MB for documents).

5. **Status Workflow:** Items typically have Published/Draft status workflow. Draft items are not visible to public users.

---

## RECOMMENDATIONS FOR FUTURE EDITS

### Should Be Made Editable (Not Currently):
- About Page: Town Profile, History sections
- Governance Page: Mission & Vision content
- Offices Page: Office information, staff details
- Mayor/Sangguniang Bayan Pages: Biography content
- Development Agenda: Pillar descriptions
- Tourism Pages: Destination descriptions
- Investment Page: Investment information

### Already Editable:
- All contact information (via Settings)
- News & Updates
- Events
- Documents (including BAC documents)
- Media library
- Contact messages
- User management