# Dispatch Office Client
A react app built using the PERN stack (PostgresSQL, Express, React and Nodejs) which is a transportation management system, which assists freight managers with workflow, automation and scheduling shipments. 

### Links 
- Live Link to App (Front-End deployed on Github Pages)
   - https://romiaujla.github.io/dispatch-office-client/

- Link to Client Repo
   - https://github.com/romiaujla/dispatch-office-client

- Link to API Repo
   - https://github.com/romiaujla/dispatch-office-server
   

#### Mobile Screenshots
###### UnAssigned Loads on Dashboard
<img src="https://github.com/romiaujla/dispatch-office-client/blob/master/screenshots/dashboard-unassigned-loads.png" data-canonical-src="https://github.com/romiaujla/dispatch-office-client/blob/master/screenshots/dashboard-unassigned-loads.png" width="300" height="500" />

###### Loads In Transit Section on Dashboard
![dashboard-in-transit](https://github.com/romiaujla/dispatch-office-client/blob/master/screenshots/dashboard-in-transit-loads.png)

###### Idle Drivers Section on the Dashboard
![dashboard-idle-drivers](https://github.com/romiaujla/dispatch-office-client/blob/master/screenshots/dashboard-idle-drivers.png)

###### Menu Items For management
![other-menu](https://github.com/romiaujla/dispatch-office-client/blob/master/screenshots/menu.png)


#### Tech Used
- Front End: React, React Router, Javascript, HTML5, CSS3
- Back End: NodeJS, Express, Postgresql
- Deployment: Heroku for Server, Github Pages for client




#### Features for the future
- Have driver accounts, so the status of the load can be updated by the drivers as well.
- The driver accounts will have list of schedules loads, where they can look at theier upcoming loads.
- Adding comments / remarks on a load that are sent to the dispatched where he would get a notification, and could respond to the comment / remark added by the driver. For communicating load related issues.
- The truck progress line on every load should able to slide to update the load status.
- By creating separate driver accounts, the driver should be able to upload documents for a load. Once the documents are uploaded the dispatcher should be able to determine if the paperwork submitted is clear or needs to be resubmitted. Incase of resubmisison the driver should get a notification for doing so. 
- Drivers should be able to view on their weekly earnings.

#### My Approach to build this project
- Developed user stories which helped me figure out the minimial viable product that I was to build.
- Designed the ERD for the database.
- Designed the wireframes
- Built the static client in ReactJS and adding styles using CSS3.
- Built the backend using NodeJS and Expres using the TDD with Mocha, Chai and Supertest.
