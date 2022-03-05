DROP TABLE IF EXISTS Users ;
DROP TABLE IF EXISTS Appointments;

CREATE TABLE IF NOT EXISTS Users (
  idUser INT NOT NULL AUTO_INCREMENT,
  Username VARCHAR(45) NOT NULL UNIQUE,
  Password VARCHAR(255) NULL,
  Role INT NULL,
  PRIMARY KEY (idUser)
  
    );

CREATE TABLE IF NOT EXISTS Appointments (
  idAppointment INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(45) NOT NULL,
  Description VARCHAR(255) NULL,
  StartDate DATETIME NOT NULL,
  EndDate DATETIME NOT NULL,
  Workload INT NULL,
  PRIMARY KEY (idAppointment)
  
    );
    
	INSERT INTO USERS(Username,Password,Role) VALUES('User1','$2b$10$D4Uchb9gcKJ6WLdU6lw5TOMNPKRCSsvPrKQqBP1EjHywGlQeN/39S',0);
	INSERT INTO USERS(Username,Password,Role) VALUES('User2','$2b$10$FXuFgga.yM31J.Z9eGkOEuMjjRd2NDkX29Z0WN8nDruJ63hCoGKMK',0);
	INSERT INTO USERS(Username,Password,Role) VALUES('User3','$2b$10$k1a1knMr6xpOyVa/OU04P.fySG.vaaPTkAg3X7g8nQfovyslT0e/2',0);
	INSERT INTO USERS(Username,Password,Role) VALUES('User4','$2b$10$tATvyHz8Ypi3I.VRgak7.uStvV.GXp35JFRR/ZQjYTORbnbGdJoFG',0);
	INSERT INTO USERS(Username,Password,Role) VALUES('User5','$2b$10$G6Co478C2Qjdxf04lkAsveNlLedp54hN3n2OR9XkViavma5m.n6gS',0);
	INSERT INTO USERS(Username,Password,Role) VALUES('User6','$2b$10$DRuIpojZ87dYO1Fv3fZH6enDAvHYqJfyskvOJ1HaYOXqm.aA7Q5c.',0);
	INSERT INTO USERS(Username,Password,Role) VALUES('User7','$2b$10$.DBIm/bszFnw6PJ8w.svbuiChQseVgTbwwSq0W6A0uuo0zK02Uhni',0);



	INSERT INTO Appointments(Name,Description,StartDate,EndDate,Workload) VALUES('TestTermin 1','Description',STR_TO_DATE('20.05.2022', '%d.%m.%Y'),STR_TO_DATE('25.05.2022', '%d.%m.%Y'),12);
	INSERT INTO Appointments(Name,Description,StartDate,EndDate,Workload) VALUES('TestTermin 2','Description',STR_TO_DATE('01.05.2022', '%d.%m.%Y'),STR_TO_DATE('27.05.2022', '%d.%m.%Y'),4);
    INSERT INTO Appointments(Name,Description,StartDate,EndDate,Workload) VALUES('TestTermin 3','Description',STR_TO_DATE('14.04.2022', '%d.%m.%Y'),STR_TO_DATE('01.05.2022', '%d.%m.%Y'),87);
    INSERT INTO Appointments(Name,Description,StartDate,EndDate,Workload) VALUES('TestTermin 4','Description',STR_TO_DATE('10.04.2022', '%d.%m.%Y'),STR_TO_DATE('17.04.2022', '%d.%m.%Y'),3);
    INSERT INTO Appointments(Name,Description,StartDate,EndDate,Workload) VALUES('TestTermin 5','Description',STR_TO_DATE('29.05.2022', '%d.%m.%Y'),STR_TO_DATE('25.06.2022', '%d.%m.%Y'),35);
    INSERT INTO Appointments(Name,Description,StartDate,EndDate,Workload) VALUES('TestTermin 6','Description',STR_TO_DATE('10.06.2022', '%d.%m.%Y'),STR_TO_DATE('15.06.2022', '%d.%m.%Y'),20);

commit ;