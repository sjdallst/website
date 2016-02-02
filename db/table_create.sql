-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2016-02-01 23:52:50.551


USE ktp;



-- tables
-- Table Amenity
CREATE TABLE Amenity (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(20)  NOT NULL,
    UNIQUE INDEX Amenity_ak_1 (name),
    CONSTRAINT Amenity_pk PRIMARY KEY (id)
);

-- Table Committee
CREATE TABLE Committee (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(40)  NOT NULL,
    UNIQUE INDEX Committee_ak_1 (name),
    CONSTRAINT Committee_pk PRIMARY KEY (id)
);

-- Table CommitteeMember
CREATE TABLE CommitteeMember (
    committee_id int  NOT NULL,
    member_id int  NOT NULL,
    CONSTRAINT CommitteeMember_pk PRIMARY KEY (committee_id,member_id)
);

-- Table Event
CREATE TABLE Event (
    id int  NOT NULL  AUTO_INCREMENT,
    title varchar(50)  NOT NULL,
    description text  NULL,
    start_time time  NOT NULL,
    end_time time  NULL,
    location varchar(100)  NOT NULL,
    event_category_id int  NULL,
    pro_dev_credits int  NOT NULL  DEFAULT 0,
    com_serv_hours int  NOT NULL  DEFAULT 0,
    facebook_url varchar(100)  NULL,
    CONSTRAINT Event_pk PRIMARY KEY (id)
);

-- Table EventAmenity
CREATE TABLE EventAmenity (
    event_id int  NOT NULL,
    amenity_id int  NOT NULL,
    CONSTRAINT EventAmenity_pk PRIMARY KEY (event_id,amenity_id)
);

-- Table EventCategory
CREATE TABLE EventCategory (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(30)  NOT NULL,
    UNIQUE INDEX EventCategory_ak_1 (name),
    CONSTRAINT EventCategory_pk PRIMARY KEY (id)
);

-- Table Family
CREATE TABLE Family (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(30)  NOT NULL,
    points int  NOT NULL  DEFAULT 0,
    UNIQUE INDEX Family_ak_1 (name),
    CONSTRAINT Family_pk PRIMARY KEY (id)
);

-- Table FamilyWinner
CREATE TABLE FamilyWinner (
    semester_id int  NOT NULL,
    family_id int  NOT NULL,
    CONSTRAINT FamilyWinner_pk PRIMARY KEY (semester_id,family_id)
);

-- Table Major
CREATE TABLE Major (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(100)  NOT NULL,
    UNIQUE INDEX Major_ak_1 (name),
    CONSTRAINT Major_pk PRIMARY KEY (id)
);

-- Table Member
CREATE TABLE Member (
    id int  NOT NULL  AUTO_INCREMENT,
    first_name varchar(30)  NOT NULL,
    last_name varchar(30)  NOT NULL,
    grad_year int  NOT NULL,
    pledge_class_id int  NULL,
    member_status_id int  NULL,
    member_role_id int  NULL,
    family_id int  NULL,
    photo_id int  NULL,
    phone_number char(10)  NULL,
    email varchar(40)  NOT NULL,
    pwd_hash varchar(40)  NOT NULL,
    CONSTRAINT Member_pk PRIMARY KEY (id)
);

-- Table MemberAttendance
CREATE TABLE MemberAttendance (
    event_id int  NOT NULL,
    member_id int  NOT NULL,
    CONSTRAINT MemberAttendance_pk PRIMARY KEY (event_id,member_id)
);

-- Table MemberMajor
CREATE TABLE MemberMajor (
    member_id int  NOT NULL,
    major_id int  NOT NULL,
    CONSTRAINT MemberMajor_pk PRIMARY KEY (member_id,major_id)
);

-- Table MemberMinor
CREATE TABLE MemberMinor (
    member_id int  NOT NULL,
    minor_id int  NOT NULL,
    CONSTRAINT MemberMinor_pk PRIMARY KEY (member_id,minor_id)
);

-- Table MemberProfile
CREATE TABLE MemberProfile (
    member_id int  NOT NULL,
    bio text  NULL,
    linkedin varchar(30)  NULL,
    facebook varchar(30)  NULL,
    twitter varchar(30)  NULL,
    website varchar(200)  NULL,
    CONSTRAINT MemberProfile_pk PRIMARY KEY (member_id)
);

-- Table MemberRole
CREATE TABLE MemberRole (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    UNIQUE INDEX MemberRole_ak_1 (name),
    CONSTRAINT MemberRole_pk PRIMARY KEY (id)
);

-- Table MemberStatus
CREATE TABLE MemberStatus (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(20)  NOT NULL,
    UNIQUE INDEX MemberStatus_ak_1 (name),
    CONSTRAINT MemberStatus_pk PRIMARY KEY (id)
);

-- Table Minor
CREATE TABLE Minor (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(100)  NOT NULL,
    UNIQUE INDEX Minor_ak_1 (name),
    CONSTRAINT Minor_pk PRIMARY KEY (id)
);

-- Table Photo
CREATE TABLE Photo (
    id int  NOT NULL  AUTO_INCREMENT,
    filename int  NOT NULL,
    upload_time timestamp  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    caption text  NULL,
    UNIQUE INDEX Photo_ak_1 (filename),
    CONSTRAINT Photo_pk PRIMARY KEY (id)
);

-- Table PledgeClass
CREATE TABLE PledgeClass (
    id int  NOT NULL  AUTO_INCREMENT,
    name varchar(30)  NOT NULL,
    UNIQUE INDEX PledgeClass_ak_1 (name),
    CONSTRAINT PledgeClass_pk PRIMARY KEY (id)
);

-- Table PledgeMeeting
CREATE TABLE PledgeMeeting (
    pledge_member_id int  NOT NULL,
    active_member_id int  NOT NULL,
    date date  NOT NULL,
    photo_id int  NULL,
    CONSTRAINT PledgeMeeting_pk PRIMARY KEY (pledge_member_id,active_member_id)
);

-- Table PledgeTask
CREATE TABLE PledgeTask (
    id int  NOT NULL,
    name varchar(40)  NOT NULL,
    description text  NULL,
    num_participants int  NOT NULL  DEFAULT 1,
    points int  NOT NULL  DEFAULT 0,
    is_repeatable bool  NOT NULL  DEFAULT false,
    is_required bool  NOT NULL  DEFAULT false,
    is_complete bool  NOT NULL  DEFAULT false,
    UNIQUE INDEX PledgeTask_ak_1 (name),
    CONSTRAINT PledgeTask_pk PRIMARY KEY (id)
);

-- Table PledgeTaskParticipant
CREATE TABLE PledgeTaskParticipant (
    pledge_task_id int  NOT NULL,
    pledge_member_id int  NOT NULL,
    CONSTRAINT PledgeTaskParticipant_pk PRIMARY KEY (pledge_task_id,pledge_member_id)
);

-- Table Project
CREATE TABLE Project (
    id int  NOT NULL  AUTO_INCREMENT,
    title varchar(50)  NOT NULL,
    client varchar(50)  NOT NULL,
    completion_date date  NULL,
    CONSTRAINT Project_pk PRIMARY KEY (id)
);

-- Table ProjectMember
CREATE TABLE ProjectMember (
    member_id int  NOT NULL,
    project_id int  NOT NULL,
    CONSTRAINT ProjectMember_pk PRIMARY KEY (member_id,project_id)
);

-- Table Requirement
CREATE TABLE Requirement (
    member_id int  NOT NULL,
    pro_dev_credits int  NOT NULL  DEFAULT 0,
    com_serv_hours int  NOT NULL  DEFAULT 0,
    has_paid_dues bool  NOT NULL  DEFAULT false,
    CONSTRAINT Requirement_pk PRIMARY KEY (member_id)
);

-- Table Rushee
CREATE TABLE Rushee (
    id int  NOT NULL  AUTO_INCREMENT,
    first_name varchar(30)  NOT NULL,
    last_name varchar(30)  NOT NULL,
    grad_year int  NOT NULL,
    major varchar(50)  NOT NULL,
    phone_number char(10)  NULL,
    email varchar(40)  NULL,
    pwd_hash varchar(40)  NULL,
    CONSTRAINT Rushee_pk PRIMARY KEY (id)
);

-- Table RusheeAttendance
CREATE TABLE RusheeAttendance (
    rushee_id int  NOT NULL,
    event_id int  NOT NULL,
    CONSTRAINT RusheeAttendance_pk PRIMARY KEY (rushee_id,event_id)
);

-- Table Semester
CREATE TABLE Semester (
    id int  NOT NULL  AUTO_INCREMENT,
    year int  NOT NULL,
    term char(6)  NOT NULL,
    UNIQUE INDEX Semester_ak_1 (year,term),
    CONSTRAINT Semester_pk PRIMARY KEY (id)
);





-- foreign keys
-- Reference:  CommitteeMember_Committee (table: CommitteeMember)

ALTER TABLE CommitteeMember ADD CONSTRAINT CommitteeMember_Committee FOREIGN KEY CommitteeMember_Committee (committee_id)
    REFERENCES Committee (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  CommitteeMember_Member (table: CommitteeMember)

ALTER TABLE CommitteeMember ADD CONSTRAINT CommitteeMember_Member FOREIGN KEY CommitteeMember_Member (member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  EventAmenity_Amenity (table: EventAmenity)

ALTER TABLE EventAmenity ADD CONSTRAINT EventAmenity_Amenity FOREIGN KEY EventAmenity_Amenity (amenity_id)
    REFERENCES Amenity (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  EventAmenity_Event (table: EventAmenity)

ALTER TABLE EventAmenity ADD CONSTRAINT EventAmenity_Event FOREIGN KEY EventAmenity_Event (event_id)
    REFERENCES Event (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  EventAttendance_Event (table: MemberAttendance)

ALTER TABLE MemberAttendance ADD CONSTRAINT EventAttendance_Event FOREIGN KEY EventAttendance_Event (event_id)
    REFERENCES Event (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  EventAttendance_Member (table: MemberAttendance)

ALTER TABLE MemberAttendance ADD CONSTRAINT EventAttendance_Member FOREIGN KEY EventAttendance_Member (member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  Event_EventCategory (table: Event)

ALTER TABLE Event ADD CONSTRAINT Event_EventCategory FOREIGN KEY Event_EventCategory (event_category_id)
    REFERENCES EventCategory (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
-- Reference:  FamilyWinner_Family (table: FamilyWinner)

ALTER TABLE FamilyWinner ADD CONSTRAINT FamilyWinner_Family FOREIGN KEY FamilyWinner_Family (family_id)
    REFERENCES Family (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  FamilyWinner_Semester (table: FamilyWinner)

ALTER TABLE FamilyWinner ADD CONSTRAINT FamilyWinner_Semester FOREIGN KEY FamilyWinner_Semester (semester_id)
    REFERENCES Semester (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  MemberMajor_Major (table: MemberMajor)

ALTER TABLE MemberMajor ADD CONSTRAINT MemberMajor_Major FOREIGN KEY MemberMajor_Major (major_id)
    REFERENCES Major (id);
-- Reference:  MemberMajor_Member (table: MemberMajor)

ALTER TABLE MemberMajor ADD CONSTRAINT MemberMajor_Member FOREIGN KEY MemberMajor_Member (member_id)
    REFERENCES Member (id);
-- Reference:  MemberMinor_Member (table: MemberMinor)

ALTER TABLE MemberMinor ADD CONSTRAINT MemberMinor_Member FOREIGN KEY MemberMinor_Member (member_id)
    REFERENCES Member (id);
-- Reference:  MemberMinor_Minor (table: MemberMinor)

ALTER TABLE MemberMinor ADD CONSTRAINT MemberMinor_Minor FOREIGN KEY MemberMinor_Minor (minor_id)
    REFERENCES Minor (id)
    ON UPDATE CASCADE;
-- Reference:  MemberProfile_Member (table: MemberProfile)

ALTER TABLE MemberProfile ADD CONSTRAINT MemberProfile_Member FOREIGN KEY MemberProfile_Member (member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  Member_Family (table: Member)

ALTER TABLE Member ADD CONSTRAINT Member_Family FOREIGN KEY Member_Family (family_id)
    REFERENCES Family (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
-- Reference:  Member_MemberRole (table: Member)

ALTER TABLE Member ADD CONSTRAINT Member_MemberRole FOREIGN KEY Member_MemberRole (member_role_id)
    REFERENCES MemberRole (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
-- Reference:  Member_MemberStatus (table: Member)

ALTER TABLE Member ADD CONSTRAINT Member_MemberStatus FOREIGN KEY Member_MemberStatus (member_status_id)
    REFERENCES MemberStatus (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
-- Reference:  Member_Photo (table: Member)

ALTER TABLE Member ADD CONSTRAINT Member_Photo FOREIGN KEY Member_Photo (photo_id)
    REFERENCES Photo (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
-- Reference:  Member_PledgeClass (table: Member)

ALTER TABLE Member ADD CONSTRAINT Member_PledgeClass FOREIGN KEY Member_PledgeClass (pledge_class_id)
    REFERENCES PledgeClass (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
-- Reference:  PledgeMeeting_Active (table: PledgeMeeting)

ALTER TABLE PledgeMeeting ADD CONSTRAINT PledgeMeeting_Active FOREIGN KEY PledgeMeeting_Active (active_member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  PledgeMeeting_Photo (table: PledgeMeeting)

ALTER TABLE PledgeMeeting ADD CONSTRAINT PledgeMeeting_Photo FOREIGN KEY PledgeMeeting_Photo (photo_id)
    REFERENCES Photo (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
-- Reference:  PledgeMeeting_Pledge (table: PledgeMeeting)

ALTER TABLE PledgeMeeting ADD CONSTRAINT PledgeMeeting_Pledge FOREIGN KEY PledgeMeeting_Pledge (pledge_member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  PledgeTaskParticipant_Member (table: PledgeTaskParticipant)

ALTER TABLE PledgeTaskParticipant ADD CONSTRAINT PledgeTaskParticipant_Member FOREIGN KEY PledgeTaskParticipant_Member (pledge_member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  PledgeTaskParticipant_PledgeTask (table: PledgeTaskParticipant)

ALTER TABLE PledgeTaskParticipant ADD CONSTRAINT PledgeTaskParticipant_PledgeTask FOREIGN KEY PledgeTaskParticipant_PledgeTask (pledge_task_id)
    REFERENCES PledgeTask (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  ProjectMember_Member (table: ProjectMember)

ALTER TABLE ProjectMember ADD CONSTRAINT ProjectMember_Member FOREIGN KEY ProjectMember_Member (member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  ProjectMember_Project (table: ProjectMember)

ALTER TABLE ProjectMember ADD CONSTRAINT ProjectMember_Project FOREIGN KEY ProjectMember_Project (project_id)
    REFERENCES Project (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  Requirement_Member (table: Requirement)

ALTER TABLE Requirement ADD CONSTRAINT Requirement_Member FOREIGN KEY Requirement_Member (member_id)
    REFERENCES Member (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
-- Reference:  RusheeAttendance_Event (table: RusheeAttendance)

ALTER TABLE RusheeAttendance ADD CONSTRAINT RusheeAttendance_Event FOREIGN KEY RusheeAttendance_Event (event_id)
    REFERENCES Event (id);
-- Reference:  RusheeAttendance_Rushee (table: RusheeAttendance)

ALTER TABLE RusheeAttendance ADD CONSTRAINT RusheeAttendance_Rushee FOREIGN KEY RusheeAttendance_Rushee (rushee_id)
    REFERENCES Rushee (id);



-- End of file.
