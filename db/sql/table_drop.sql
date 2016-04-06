-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2016-03-29 23:23:42.479


USE ktp;


-- foreign keys
ALTER TABLE MemberAttendance DROP FOREIGN KEY AttendanceCategory_MemberAttendance;
ALTER TABLE Member DROP FOREIGN KEY Big_Little;
ALTER TABLE CommitteeMember DROP FOREIGN KEY CommitteeMember_Committee;
ALTER TABLE CommitteeMember DROP FOREIGN KEY CommitteeMember_Member;
ALTER TABLE EventAmenity DROP FOREIGN KEY EventAmenity_Amenity;
ALTER TABLE EventAmenity DROP FOREIGN KEY EventAmenity_Event;
ALTER TABLE MemberAttendance DROP FOREIGN KEY EventAttendance_Event;
ALTER TABLE MemberAttendance DROP FOREIGN KEY EventAttendance_Member;
ALTER TABLE Event DROP FOREIGN KEY Event_EventCategory;
ALTER TABLE FamilyWinner DROP FOREIGN KEY FamilyWinner_Family;
ALTER TABLE FamilyWinner DROP FOREIGN KEY FamilyWinner_Semester;
ALTER TABLE MemberMajor DROP FOREIGN KEY MemberMajor_Major;
ALTER TABLE MemberMajor DROP FOREIGN KEY MemberMajor_Member;
ALTER TABLE MemberMinor DROP FOREIGN KEY MemberMinor_Member;
ALTER TABLE MemberMinor DROP FOREIGN KEY MemberMinor_Minor;
ALTER TABLE MemberProfile DROP FOREIGN KEY MemberProfile_Member;
ALTER TABLE Member DROP FOREIGN KEY Member_Family;
ALTER TABLE Member DROP FOREIGN KEY Member_MemberRole;
ALTER TABLE Member DROP FOREIGN KEY Member_MemberStatus;
ALTER TABLE Member DROP FOREIGN KEY Member_Photo;
ALTER TABLE Member DROP FOREIGN KEY Member_PledgeClass;
ALTER TABLE PledgeClass DROP FOREIGN KEY PledgeClass_Semester;
ALTER TABLE PledgeMeeting DROP FOREIGN KEY PledgeMeeting_Active;
ALTER TABLE PledgeMeeting DROP FOREIGN KEY PledgeMeeting_Photo;
ALTER TABLE PledgeMeeting DROP FOREIGN KEY PledgeMeeting_Pledge;
ALTER TABLE PledgeTaskParticipant DROP FOREIGN KEY PledgeTaskParticipant_Member;
ALTER TABLE PledgeTaskParticipant DROP FOREIGN KEY PledgeTaskParticipant_PledgeTask;
ALTER TABLE ProjectMember DROP FOREIGN KEY ProjectMember_Member;
ALTER TABLE ProjectMember DROP FOREIGN KEY ProjectMember_Project;
ALTER TABLE Requirement DROP FOREIGN KEY Requirement_Member;
ALTER TABLE RusheeAttendance DROP FOREIGN KEY RusheeAttendance_Event;
ALTER TABLE RusheeAttendance DROP FOREIGN KEY RusheeAttendance_Rushee;
ALTER TABLE Semester DROP FOREIGN KEY Semester_Term;

-- tables
-- Table Amenity
DROP TABLE Amenity;
-- Table AttendanceCategory
DROP TABLE AttendanceCategory;
-- Table Committee
DROP TABLE Committee;
-- Table CommitteeMember
DROP TABLE CommitteeMember;
-- Table Event
DROP TABLE Event;
-- Table EventAmenity
DROP TABLE EventAmenity;
-- Table EventCategory
DROP TABLE EventCategory;
-- Table Family
DROP TABLE Family;
-- Table FamilyWinner
DROP TABLE FamilyWinner;
-- Table Major
DROP TABLE Major;
-- Table Member
DROP TABLE Member;
-- Table MemberAttendance
DROP TABLE MemberAttendance;
-- Table MemberMajor
DROP TABLE MemberMajor;
-- Table MemberMinor
DROP TABLE MemberMinor;
-- Table MemberProfile
DROP TABLE MemberProfile;
-- Table MemberRole
DROP TABLE MemberRole;
-- Table MemberStatus
DROP TABLE MemberStatus;
-- Table Minor
DROP TABLE Minor;
-- Table Photo
DROP TABLE Photo;
-- Table PledgeClass
DROP TABLE PledgeClass;
-- Table PledgeMeeting
DROP TABLE PledgeMeeting;
-- Table PledgeTask
DROP TABLE PledgeTask;
-- Table PledgeTaskParticipant
DROP TABLE PledgeTaskParticipant;
-- Table Project
DROP TABLE Project;
-- Table ProjectMember
DROP TABLE ProjectMember;
-- Table Requirement
DROP TABLE Requirement;
-- Table Rushee
DROP TABLE Rushee;
-- Table RusheeAttendance
DROP TABLE RusheeAttendance;
-- Table Semester
DROP TABLE Semester;
-- Table Term
DROP TABLE Term;



-- End of file.
