INSERT INTO TEAM ( id, name, color, cred ) VALUES ( 200, 'Orange', 'orange', 'citrus' );
INSERT INTO TEAM ( id, name, color, cred ) VALUES ( 201, 'Green', 'green', 'grass' );
INSERT INTO TEAM ( id, name, color, cred ) VALUES ( 202, 'Blue', 'blue', 'sky' );

INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 300, 200, 'Bob' );
INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 301, 200, 'Sally' );
INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 302, 201, 'Jim' );
INSERT INTO PLAYER ( id, team_id, name ) VALUES ( 303, 201, 'Anna' );


INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 401, 'Question #1', 'Reversi', 'Code something that will take in a string and output that string in reverse', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 402, 'Question #2', 'Count the numbers', 'Code something that will take in a string and output the count of how many digits were found', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 403, 'Question #3', 'Camel Case', 'Code something that will take in a string and output the letters alternating in capital and lower case', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 404, 'Question #4', 'Tic Tac Toe', 'Code something that will take in a 3 x 3 of "X" and "O" and output the correct character if there is a winner or a dash if there is no winner.', '', '', '' );
INSERT INTO QUESTION ( id, header, title, text, team_submit, team_correct, team_fail ) VALUES ( 405, 'Question #5', 'Oil field', 'Code something that will take in any number of strings with a mix of "#" and "@".  Each @ represents oil.  If oil is touching other oil it counts as a single field.  For example, a string of "##@@@###@#@" has 3 oil fields.  The code will continue to read lines and output the count on new lines until it reaches the letter "D".', '', '', '' );