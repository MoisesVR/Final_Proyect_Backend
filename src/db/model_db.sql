CREATE DATABASE gimnasio;

\c gimnasio

CREATE TABLE plans( id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, duration VARCHAR(50) NOT NULL, description VARCHAR(5000) NOT NULL, cost INT NOT NULL);

CREATE TABLE user_type( id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL);

CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, email VARCHAR(200) NOT NULL, password VARCHAR(1000) NOT NULL, address VARCHAR(1000) NOT NULL, payment_type VARCHAR(50) NOT NULL, id_user_type INT NOT NULL, id_plan INT NOT NULL, FOREIGN KEY (id_user_type) REFERENCES user_type(id) ON DELETE CASCADE, FOREIGN KEY (id_plan) REFERENCES plans(id) ON DELETE CASCADE);

CREATE TABLE class( id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, img VARCHAR(2000) NOT NULL, alt VARCHAR(2000) NOT NULL, description VARCHAR(5000) NOT NULL, cupo INT NOT NULL);

CREATE TABLE class_reserve( id SERIAL PRIMARY KEY, date VARCHAR(100) NOT NULL, hour VARCHAR(100) NOT NULL, id_user INT NOT NULL, id_class INT NOT NULL, FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (id_class) REFERENCES class(id) ON DELETE CASCADE);

CREATE TABLE entry( id SERIAL PRIMARY KEY, date VARCHAR(100) NOT NULL, hour VARCHAR(100) NOT NULL, id_user INT NOT NULL, FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE);

INSERT INTO plans(name, duration, description, cost) VALUES ('Sin Plan', 'Indefinido', 'Sin membresia', 0);
INSERT INTO plans(name, duration, description, cost) VALUES('Anual', '12 meses', 'Membresía con duración de 12 meses con posibilidad de congelación, acceso sin limites todos los dias de vigencia de tu plan, acceso ilimitado a todas las clases dirigidas durante la vigencia del plan, evaluacion antropometrica con sistema inbody de ultima generacion, programa de entrenamiento enfocado a tus objetivos.', 120000);
INSERT INTO plans(name, duration, description, cost) VALUES('Semestral', '6 mes', 'Membresía con duración de 6 meses con posibilidad de congelación, acceso sin limites todos los dias de vigencia de tu plan, acceso ilimitado a todas las clases dirigidas durante la vigencia del plan, evaluacion antropometrica con sistema inbody de ultima generacion, programa de entrenamiento enfocado a tus objetivos.', 70000);
INSERT INTO plans(name, duration, description, cost) VALUES('Trimestral', '3 meses', 'Membresía con duración de 3 meses con posibilidad de congelación, acceso sin limites todos los dias de vigencia de tu plan, acceso ilimitado a todas las clases dirigidas durante la vigencia del plan, evaluacion antropometrica con sistema inbody de ultima generacion, programa de entrenamiento enfocado a tus objetivos.', 40000);
INSERT INTO plans(name, duration, description, cost) VALUES('Mensual', '1 mes','Membresía con duración de 6 meses con posibilidad de congelación, acceso sin limites todos los dias de vigencia de tu plan, acceso ilimitado a todas las clases dirigidas durante la vigencia del plan, evaluacion antropometrica con sistema inbody de ultima generacion, programa de entrenamiento enfocado a tus objetivos.', 30000); 

INSERT INTO user_type(name) VALUES('Admin');
INSERT INTO user_type(name) VALUES('Usuario');

INSERT INTO users(name, email, password, address, payment_type,id_user_type, id_plan) VALUES('Moises','moises@gmail.com','$2a$10$Q2KLvdunisiYDXNUpQ43z.1jLQtRnrkfV3Z5WQVNLpRCA09xvpwwa','calle siempre viva','efectivo',1,1);

INSERT INTO class(name, img, alt, description, cupo) VALUES('Combat','https://guiafitness.com/wp-content/uploads/body-combat-1200x675.jpg','personas practicando combate','Uno de los mejores entrenamientos aeróbicos con el cual lograrás elevar tus pulsaciones mientras realizas una perfecta coreografía de movimientos de artes marciales, mejorando tu flexibilidad, fuerza, coordinación y resistencia cardiovascular.', 30);
INSERT INTO class(name, img, alt, description, cupo) VALUES('Fit Grit','https://www.dinamity.cl/wp-content/uploads/2021/05/fitgrit.png','personas practicando deporte','Experimenta esta serie de ejercicios de alta intensidad, durante 30 minutos te brindaremos increíbles resultados de acondicionamiento físico, a través de un diseño único de entrenamiento y en el cual podrás trabajar tu cuerpo de distintas formas, usando implementos o tu propio peso corporal.', 15);
INSERT INTO class(name, img, alt, description, cupo) VALUES('Athletic','https://www.feda.net/wp-content/uploads/2018/08/circuit-training.jpeg','personas practicando deporte en circuitos','Modalidad de entrenamiento en circuito, basado en el principio fisiológico de la sobrecarga muscular, que consiste en llevarte a realizar ejercicios de manera continua, aprovechando al máximo tu tiempo de entrenamiento y estimulando tus músculos de manera alternada.',20);

INSERT INTO class_reserve(date, hour, id_user, id_class) VALUES('23/02/2023','12:30',2,1);
INSERT INTO class_reserve(date, hour, id_user, id_class) VALUES('24/03/2023','10:00',2,1);
INSERT INTO class_reserve(date, hour, id_user, id_class) VALUES('03/04/2023', '17:00',3,3);

INSERT INTO entry(date, hour, id_user) VALUES('23/02/2023','15:30',2);
INSERT INTO entry(date, hour, id_user) VALUES('23/02/2023','12:30',3);
INSERT INTO entry(date, hour, id_user) VALUES('03/04/2023', '18:00', 3);
INSERT INTO entry(date, hour, id_user) VALUES('03/04/2023', '18:00', 2);
