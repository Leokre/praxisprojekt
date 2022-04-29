DROP TABLE IF EXISTS OccupiedDays;
DROP TABLE IF EXISTS Appointments;
DROP TABLE IF EXISTS UserCourses;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Users;



CREATE TABLE IF NOT EXISTS Users (
  idUser INT NOT NULL AUTO_INCREMENT,
  Email VARCHAR(45) NOT NULL UNIQUE,
  Password VARCHAR(255) NULL,
  Role INT NULL,
  PRIMARY KEY (idUser)
  
    );


CREATE TABLE IF NOT EXISTS Courses (
  idCourse INT NOT NULL AUTO_INCREMENT,
  idAdmin INT NOT NULL,
  Name VARCHAR(45) NOT NULL,
  Description VARCHAR(255) NULL,
  ECTS INT NOT NULL,
  PRIMARY KEY (idCourse),
    CONSTRAINT idAdmin_c       FOREIGN KEY (idAdmin)        REFERENCES Users (idUser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  
    );


CREATE TABLE IF NOT EXISTS UserCourses (
  idCourse INT NOT NULL AUTO_INCREMENT,
  idUser INT NOT NULL,
  PRIMARY KEY (idCourse,idUser),
  CONSTRAINT idCourse_uc       FOREIGN KEY (idCourse)        REFERENCES Courses (idCourse)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
  CONSTRAINT idUser_uc       FOREIGN KEY (idUser)        REFERENCES Users (idUser)
  ON DELETE CASCADE
  ON UPDATE NO ACTION
  
    );
    
 
    
CREATE TABLE IF NOT EXISTS Appointments (
  idAppointment INT NOT NULL AUTO_INCREMENT,
  idUser INT NULL,
  idCourse INT NULL,
  adminName VARCHAR(45) NULL,
  Name VARCHAR(45) NOT NULL,
  Description VARCHAR(255) NULL,
  Category VARCHAR(45) NOT NULL,
  StartDate DATETIME NOT NULL,
  EndDate DATETIME NOT NULL,
  Workload DOUBLE NULL,
  PRIMARY KEY (idAppointment),
  CONSTRAINT idUser_ap       FOREIGN KEY (idUser)        REFERENCES Users (idUser)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT idCourse_ap       FOREIGN KEY (idCourse)        REFERENCES Courses (idCourse)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    );
    
CREATE TABLE IF NOT EXISTS OccupiedDays (
  idOccDay INT NOT NULL AUTO_INCREMENT,
  idUser INT NULL,
  idAppointment INT NOT NULL,
  idCourse INT NULL,
  Date DATETIME NOT NULL,
  Workload DOUBLE NULL,
  PRIMARY KEY (idOccDay),
  CONSTRAINT idAppointment_od       FOREIGN KEY (idAppointment)        REFERENCES Appointments (idAppointment)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
  CONSTRAINT idCourse_od       FOREIGN KEY (idCourse)        REFERENCES Courses (idCourse)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
  CONSTRAINT idUser_od       FOREIGN KEY (idUser)        REFERENCES Users (idUser)
  ON DELETE CASCADE
  ON UPDATE NO ACTION
  
    );   
    
	INSERT INTO USERS(Email,Password,Role) VALUES('User@1.com','$2b$10$D4Uchb9gcKJ6WLdU6lw5TOMNPKRCSsvPrKQqBP1EjHywGlQeN/39S',0);
	INSERT INTO USERS(Email,Password,Role) VALUES('User@2.com','$2b$10$FXuFgga.yM31J.Z9eGkOEuMjjRd2NDkX29Z0WN8nDruJ63hCoGKMK',1);
	INSERT INTO USERS(Email,Password,Role) VALUES('User@3.com','$2b$10$k1a1knMr6xpOyVa/OU04P.fySG.vaaPTkAg3X7g8nQfovyslT0e/2',0);
	INSERT INTO USERS(Email,Password,Role) VALUES('User@4.com','$2b$10$tATvyHz8Ypi3I.VRgak7.uStvV.GXp35JFRR/ZQjYTORbnbGdJoFG',0);
	INSERT INTO USERS(Email,Password,Role) VALUES('User@5.com','$2b$10$G6Co478C2Qjdxf04lkAsveNlLedp54hN3n2OR9XkViavma5m.n6gS',0);
	INSERT INTO USERS(Email,Password,Role) VALUES('User@6.com','$2b$10$DRuIpojZ87dYO1Fv3fZH6enDAvHYqJfyskvOJ1HaYOXqm.aA7Q5c.',0);
	INSERT INTO USERS(Email,Password,Role) VALUES('User@7.com','$2b$10$.DBIm/bszFnw6PJ8w.svbuiChQseVgTbwwSq0W6A0uuo0zK02Uhni',0);



	INSERT INTO Appointments(idUser,Name,Description,Category,StartDate,EndDate,Workload) VALUES(1,'TestTermin 1 User 1','Description',"PRIVAT",STR_TO_DATE('20.05.2022', '%d.%m.%Y'),STR_TO_DATE('25.05.2022', '%d.%m.%Y'),12);
	INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,1,null,'2022-05-20 00:00:00',1.20846999);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,1,null,'2022-05-21 00:00:00',1.54527939);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,1,null,'2022-05-22 00:00:00',1.86643694);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,1,null,'2022-05-23 00:00:00',2.17261906);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,1,null,'2022-05-24 00:00:00',2.46449817);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,1,null,'2022-05-25 00:00:00',2.74269645);
    
    INSERT INTO Appointments(idUser,Name,Description,Category,StartDate,EndDate,Workload) VALUES(1,'TestTermin 2 User 1','Description',"PRIVAT",STR_TO_DATE('01.05.2022', '%d.%m.%Y'),STR_TO_DATE('10.05.2022', '%d.%m.%Y'),4);
	INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-01 00:00:00',0.00000000e+00);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-02 00:00:00',5.66211271e-17);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-03 00:00:00',0.00000000e+00);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-04 00:00:00',5.73441599e-17);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-05 00:00:00',1.15908220e-16);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-06 00:00:00',5.07317668e-02);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-07 00:00:00',4.36928152e-01);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-08 00:00:00',8.11391690e-01);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-09 00:00:00',1.17446887e+00);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (1,2,null,'2022-05-10 00:00:00',1.52647952e+00);
    
    INSERT INTO Appointments(idUser,Name,Description,Category,StartDate,EndDate,Workload) VALUES(3,'TestTermin 1 User 3','Description',"PRIVAT",STR_TO_DATE('14.04.2022', '%d.%m.%Y'),STR_TO_DATE('24.04.2022', '%d.%m.%Y'),87);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-14 00:00:00',7.8836351);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-15 00:00:00',7.88953904);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-16 00:00:00',7.89518268);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-17 00:00:00',7.90052846);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-18 00:00:00',7.9055442);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-19 00:00:00',7.91032279);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-20 00:00:00',7.91493956);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-21 00:00:00',7.91910374);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-22 00:00:00',7.92342928);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-23 00:00:00',7.92697481);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,3,null,'2022-04-24 00:00:00',7.93080034);
    
    INSERT INTO Appointments(idUser,Name,Description,Category,StartDate,EndDate,Workload) VALUES(3,'TestTermin 2 User 3','Description',"PRIVAT",STR_TO_DATE('10.04.2022', '%d.%m.%Y'),STR_TO_DATE('12.04.2022', '%d.%m.%Y'),3);
	INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,4,null,'2022-04-10 00:00:00',0.63832764);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,4,null,'2022-04-11 00:00:00',1.00577867);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (3,4,null,'2022-04-12 00:00:00',1.35589369);
	


	INSERT INTO COURSES(idAdmin,Name,Description,ECTS) VALUES(2,'TestKurs 1','TestBeschreibung',90);
    INSERT INTO COURSES(idAdmin,Name,Description,ECTS) VALUES(2,'TestKurs 2','TestBeschreibung',90);
    INSERT INTO COURSES(idAdmin,Name,Description,ECTS) VALUES(2,'TestKurs 3','TestBeschreibung',90);
    
    INSERT INTO UserCourses(idCourse,idUser) VALUES(1,1);
    INSERT INTO UserCourses(idCourse,idUser) VALUES(1,3);
    INSERT INTO UserCourses(idCourse,idUser) VALUES(1,4);
    INSERT INTO UserCourses(idCourse,idUser) VALUES(1,5);
    INSERT INTO UserCourses(idCourse,idUser) VALUES(1,6);
    INSERT INTO UserCourses(idCourse,idUser) VALUES(2,3);
    INSERT INTO UserCourses(idCourse,idUser) VALUES(2,4);
    INSERT INTO UserCourses(idCourse,idUser) VALUES(3,7);
    
    
    INSERT INTO Appointments(idCourse,Name,Description,Category,StartDate,EndDate,Workload,adminName) VALUES(1,'Kurs 1 Termin 1','Description',"Kurs 1",STR_TO_DATE('10.05.2022', '%d.%m.%Y'),STR_TO_DATE('13.05.2022', '%d.%m.%Y'),10,(SELECT Email from Users,Courses where Courses.idAdmin=Users.idUser and Courses.idCourse=1));
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,5,1,'2022-05-10 00:00:00',2.07056814);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,5,1,'2022-05-11 00:00:00',2.36581008);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,5,1,'2022-05-12 00:00:00',2.64747464);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,5,1,'2022-05-13 00:00:00',2.91614713);
    
    INSERT INTO Appointments(idCourse,Name,Description,Category,StartDate,EndDate,Workload,adminName) VALUES(1,'Kurs 1 Termin 2','Description',"Kurs 1",STR_TO_DATE('26.05.2022', '%d.%m.%Y'),STR_TO_DATE('28.05.2022', '%d.%m.%Y'),10,(SELECT Email from Users,Courses where Courses.idAdmin=Users.idUser and Courses.idCourse=1));
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,6,1,'2022-05-26 00:00:00',3.09218583);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,6,1,'2022-05-27 00:00:00',3.33700356);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,6,1,'2022-05-28 00:00:00',3.57081061);
    
    INSERT INTO Appointments(idCourse,Name,Description,Category,StartDate,EndDate,Workload,adminName) VALUES(2,'Kurs 2 Termin 1','Description',"Kurs 2",STR_TO_DATE('06.04.2022', '%d.%m.%Y'),STR_TO_DATE('10.04.2022', '%d.%m.%Y'),20,(SELECT Email from Users,Courses where Courses.idAdmin=Users.idUser and Courses.idCourse=2));
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,7,2,'2022-04-06 00:00:00',3.58054195);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,7,2,'2022-04-07 00:00:00',3.79971914);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,7,2,'2022-04-08 00:00:00',4.00925576);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,7,2,'2022-04-09 00:00:00',4.20953911);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,7,2,'2022-04-10 00:00:00',4.40094405);
    
    INSERT INTO Appointments(idCourse,Name,Description,Category,StartDate,EndDate,Workload,adminName) VALUES(2,'Kurs 2 Termin 2','Description',"Kurs 2",STR_TO_DATE('03.06.2022', '%d.%m.%Y'),STR_TO_DATE('03.06.2022', '%d.%m.%Y'),8,(SELECT Email from Users,Courses where Courses.idAdmin=Users.idUser and Courses.idCourse=2));
	INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,8,2,'2022-06-03 00:00:00',8);
   
	INSERT INTO Appointments(idCourse,Name,Description,Category,StartDate,EndDate,Workload,adminName) VALUES(3,'Kurs 3 Termin 1','Description',"Kurs 3",STR_TO_DATE('06.04.2022', '%d.%m.%Y'),STR_TO_DATE('12.04.2022', '%d.%m.%Y'),15,(SELECT Email from Users,Courses where Courses.idAdmin=Users.idUser and Courses.idCourse=3));
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,9,3,'2022-04-06 00:00:00',1.20941443);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,9,3,'2022-04-07 00:00:00',1.54542461);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,9,3,'2022-04-08 00:00:00',1.86584765);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,9,3,'2022-04-09 00:00:00',2.17137206);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,9,3,'2022-04-10 00:00:00',2.46265131);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,9,3,'2022-04-11 00:00:00',2.74031777);
    INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,9,3,'2022-04-12 00:00:00',3.00497217);
    
    INSERT INTO Appointments(idCourse,Name,Description,Category,StartDate,EndDate,Workload,adminName) VALUES(3,'Kurs 3 Termin 2','Description',"Kurs 3",STR_TO_DATE('03.06.2022', '%d.%m.%Y'),STR_TO_DATE('03.06.2022', '%d.%m.%Y'),4,(SELECT Email from Users,Courses where Courses.idAdmin=Users.idUser and Courses.idCourse=3));
	INSERT INTO OccupiedDays(idUser,idAppointment,idCourse,Date,Workload) VALUES (null,10,3,'2022-06-03 00:00:00',4);
	
    
	commit ;