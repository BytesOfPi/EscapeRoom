

INSERT INTO TEAM ( id, name, color, cred ) VALUES ( 200, 'Orange', 'orange', 'citrus' );
INSERT INTO TEAM ( id, name, color, cred ) VALUES ( 201, 'Green', 'green', 'grass' );
INSERT INTO TEAM ( id, name, color, cred ) VALUES ( 202, 'Blue', 'blue', 'sky' );

INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 300, 200, 'Bob' );
INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 301, 200, 'Sally' );
INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 302, 201, 'Jim' );
INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 303, 201, 'Anna' );


INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 401, 'Question #1', 'See Color', 'images/001.jpg', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 402, 'Question #2', 'Without X', 'images/002.jpg', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 403, 'Question #3', 'Min Cat', 'images/003.jpg', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 404, 'Question #4', 'Unlucky', 'images/004.jpg', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 405, 'Question #5', 'Reverse', 'images/005.jpg', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 406, 'Question #6', 'Evenly Spaced', 'images/006.jpg', '', '', '' );
