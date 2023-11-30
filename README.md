# CampaignHub

##### _All Your Campaigns In One Place_

CampaignHub is a campaigns management system that helps your business plan, execute and manage marketing campaigns, ensuring delivering on time and within budget.

![CampaignHub Logo](./public/CH_logo_full.png)

## About this project

This project is published on **Vercel**: [`https://campaignhub.vercel.app/`](https://campaignhub.vercel.app/).
And the code is hosted on **Github**: [`https://github.com/hnaimm/CampaignHub`](https://github.com/hnaimm/CampaignHub).

## _Important: Login Information_

To login please use the following credentials:

```bash
username: "blue"
password: "P@ssw0rd"
```

or any of the credentials listed in **LIST_OF_USER_ACCOUNTS** in file [`/src/data/allData.ts`]().

## To run this project locally

- Run in dev mode:

```bash
npm run dev
```

- Or in build mode:

```bash
npm run build
npm run start
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# About the code

These are the main points reagrding what was covered in the project

### Project pages

Project consists of 3 pages:

- **Home Page (/)**: Simple landing page for CampaignHub.
- **Cmpaigns Page (/campaigns)**: Page listing all campaigns for a business.
- **Insights Page (/insights)**: Dashboard showing important data summarized in charts.

### Third Party Libraries used

- **React & NextJs**
- **Typescript**
- **SASS** for styling
- **react-hook-form** for form building & **yup** for form validation
- **zustand** for global state management
- **react-table** from table building
- **react-select** for drop-down input fields
- **nivo** for insights charts
- **react-toastify** for notifications
- **floating-ui** for popover menus
- **nanoid** to auto-generate campaigns IDs
- **bcryptjs** to hash passwords on login
- For user authentication: **jsonwebtoken** to generate and verify tokens & **js-cookie** to store token in browser cookies

### User Authentication

- **User login**: on user login, password is encrypted using bcrypt and verified by comparing them to the stores passwords that are already hashed, then after successfully logging in, user in automatically navigated to the /campaigns page
- **Protected Route**: pages are wrapped in a ProtectedRoute. This component reads the loggin user info from useAuth hook and checks if user is authorized to visits page and redirects users accordingly.
  Users that are not logged in are not allowed to visit /campaigns and /insights page, so they are redirected to home page (/).
  Users that are logged in are automatically redirected to /campaigns page

### Custom Hooks

- **useModal**: a hook that helps open and manage the popup modals.
- **useAuth**: a hook that implements the login/logout functionalities and store user info in context, to be used in project.

### Data

- Mock data used in this project are all located in folder [`/src/data`](), including:
  1- List of campaign type options (LIST_OF_CAMPAIGN_TYPES)
  2- List of campaigns (LIST_OF_CAMPAIGNS)
  3- List of system users that are allowed to login (LIST_OF_USER_ACCOUNTS)
  4- List of contacts to be used when creating a new campaign (LIST_OF_CONTACTS)
  5- Mock data for insights page

- **Global state management (Zustand)**: zustand was used to manage the campaigns list.
  'LIST_OF_CAMPAIGNS' was used as the initial campaigns list, and stored in a zustand store, then all actions (clone, delete, add) done to campaigns table where reflected on the zustand store.

### What is missing in the project

Due to limitation of time, a few requested features where not implemented, and they are:

- User signup functionality
- Filter by type selection in campaigns table
