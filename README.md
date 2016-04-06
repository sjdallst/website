## Getting Started
### Install Required Software
* <a href="https://git-scm.com/downloads" target="_blank">Git</a>
* <a href="https://nodejs.org/en/download/" target="_blank">Node.js</a>
* <a href="http://dev.mysql.com/downloads/mysql/" target="_blank">MySQL</a> **Important:** Make sure to copy down your root password during installation

### Clone Repository
```
git clone https://github.com/ktp-dev/website.git
cd website
git checkout rebuild-w16
```
### Install Dependencies
```
npm install
[sudo] npm install -g bower
[sudo] npm install -g grunt-cli
bower install
```
### Database Setup
Start MySQL server in System Preferences -> MySQL, or with `mysqld`. **Perform all following commands from the root directory of this repository.**  

First login as root (enter the password you copied down).
```
mysql -u root -p
```
You will need to change your root password from the default.
```
ALTER USER 'root'@'localhost' IDENTIFIED BY '[new password]';
```
Create ktp user and database.
```
source db/sql/setup.sql
quit
```
Next login as ktp (password is in `setup.sql`).
```
mysql -u ktp -p
```
Create and load tables.
```
source db/sql/table_create.sql
source db/sql/table_load.sql
```
### Database Updates
If changes are made to the database structure, simply drop the existing tables and repeat the load steps above.
```
source db/sql/table_drop.sql
```
### Start Server
```
grunt
```
