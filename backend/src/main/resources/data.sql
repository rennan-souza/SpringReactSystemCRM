INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Steve', 'Green', 'steve_operator@systemcrm.com.br', '$2a$12$kvzDMZ9Kt5IDSWv6O8PrZOUbKJaXZC18a5lGmLojjmQ10fszhNuFi');
INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Stephanie', 'Rose', 'stephanie_admin@systemcrm.com.br', '$2a$12$SpdZsp8Q.0t6Ne3uk.2gJ.JG3Lji6tgj.zUz50NSzZLgDJCrhVCAu');
INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Joe', 'Purple', 'joe_admin_operator@systemcrm.com.br', '$2a$12$YXF60cto0VbkyA3BtGhbqu5XrL6yEVLPjlm/l1eKdahCwlhweZ9HW');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 2);



INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('João', 'Da Silva', 'joao@email.com.br', '1988-02-08', '571.492.730-33');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Rosa', 'Green', 'rosagreen@email.com.br', '1994-04-05', '270.023.860-50');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Julia', 'Mary Rose', 'julia@email.com.br', '1992-05-15', '341.881.010-16');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Pedro', 'João Puple', 'pedrojoao@email.com.br', '1979-12-22', '331.499.850-30');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Pedro', 'dos Santos', 'pedrosantos@email.com.br', '1982-10-20', '430.127.670-02');

INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Mariah', 'Rose Jame', 'mariahjame@email.com.br', '1989-04-25', '685.993.530-80');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Ana', 'Julia Santos Ferreira', 'anajulia@email.com.br', '1996-08-02', '535.243.550-48');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Steve', 'Taylor Santos', 'stevetaylorsantos@email.com.br', '1995-04-22', '252.291.530-40');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Stephanie', 'Judit Tenner', 'stephanietenner@email.com.br', '1988-06-05', '621.569.800-80');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Joe', 'Gladison', 'gladsonj@email.com.br', '1983-01-10', '710.218.160-43');

INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Lucy', 'James Pereira', 'lucyjames@email.com.br', '1990-03-18', '295.330.650-10');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Elizabeth', 'Silva Green', 'elizabethsg@email.com.br', '1999-01-05', '771.979.500-82');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Taylor', 'Silver Green', 'taylorsivlerg@email.com.br', '1989-12-05', '794.140.150-94');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Marry', 'Rosa Santos', 'mrsantos@email.com.br', '1989-12-10', '417.942.030-95');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Richie', 'Purple', 'richiep@email.com.br', '1990-10-10', '382.732.960-40');

INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('André', 'Silva Jardim', 'andresilvaj@email.com.br', '1994-04-10', '676.198.500-58');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Janete', 'Jardim Nascimento', 'jjnasimento@email.com.br', '1994-04-10', '216.437.370-74');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Bryan', 'Onryu', 'bonryu@email.com.br', '1994-04-10', '491.541.650-08');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Bianca', 'Silva Jr Pereira', 'biancasilvajr@email.com.br', '1994-04-10', '065.601.520-90');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Maria', 'Pereira da Silva', 'mariaps@email.com.br', '1994-04-10', '766.191.250-34');

INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Panda', 'Green of Blue', 'pandag0fb@email.com.br', '1994-04-10', '814.934.570-12');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Steve', 'Bryan of Yellow', 'sby_001@email.com.br', '1994-04-10', '331.923.610-50');
INSERT INTO tb_customer (first_name, last_name, email, birth_date, cpf) VALUES ('Karyn', 'Green of Yellow', 'karyn_0090@email.com.br', '1994-04-10', '905.126.200-08');



INSERT INTO tb_category (name) VALUES ('Livros');
INSERT INTO tb_category (name) VALUES ('Eletrônicos');
INSERT INTO tb_category (name) VALUES ('Computadores');
INSERT INTO tb_category (name) VALUES ('Celulares');