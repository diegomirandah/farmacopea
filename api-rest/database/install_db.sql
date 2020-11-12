SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE cambios (
  cam_id int(11) NOT NULL,
  cam_fecha_modificacion datetime NOT NULL,
  cam_nombre varchar(255) NOT NULL,
  cam_descripcion text NOT NULL,
  cont_id int(11) NOT NULL,
  usr_id varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE comentarios (
  com_id int(11) NOT NULL,
  com_fecha_creacion datetime NOT NULL,
  com_comentario varchar(500) NOT NULL,
  com_estado enum('aceptado','rechazado','pendiente') NOT NULL,
  usr_id varchar(50) DEFAULT NULL,
  cont_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE compras (
  comp_id int(11) NOT NULL,
  comp_fecha_compra datetime NOT NULL,
  comp_monto int(11) NOT NULL,
  comp_estado enum('pendiente','procesando','aceptado','rechazado') NOT NULL,
  usr_id varchar(50) DEFAULT NULL,
  plan_id int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE contenidos (
  cont_id int(11) NOT NULL,
  cont_fecha_creacion datetime NOT NULL,
  cont_nombre varchar(50) NOT NULL,
  cont_descripcion text NOT NULL,
  cont_tipo varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE contenidos_planes (
  cp_id int(11) NOT NULL,
  cont_id int(11) NOT NULL,
  plan_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE imagenes (
  ima_id int(11) NOT NULL,
  cont_id int(11) NOT NULL,
  ima_nombre varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE licencias (
  lic_id int(11) NOT NULL,
  lic_fecha_creacion datetime NOT NULL,
  lic_fecha_expiracion datetime NOT NULL,
  lic_estado enum('activa','vencida','suspendida') NOT NULL,
  usr_id varchar(50) NOT NULL,
  plan_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE login (
  usr_id varchar(50) NOT NULL,
  log_email varchar(50) NOT NULL,
  log_contrasena varchar(256) NOT NULL,
  log_tipo varchar(255) NOT NULL,
  log_token varchar(256) DEFAULT NULL,
  log_expiracion datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE planes (
  plan_id int(11) NOT NULL,
  plan_nombre varchar(30) NOT NULL,
  plan_precio int(11) NOT NULL,
  plan_descripcion text DEFAULT NULL,
  plan_duracion int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE usuarios (
  usr_nombre varchar(50) NOT NULL,
  usr_pais varchar(50) DEFAULT NULL,
  usr_ocupacion varchar(50) DEFAULT NULL,
  usr_empresa varchar(50) DEFAULT NULL,
  usr_id varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE cambios
  ADD PRIMARY KEY (cam_id),
  ADD KEY fk_cam_cont_id (cont_id),
  ADD KEY fk_cam_usr_id (usr_id);

ALTER TABLE comentarios
  ADD PRIMARY KEY (com_id),
  ADD KEY fk_com_usr_id (usr_id),
  ADD KEY fk_com_cont_id (cont_id);

ALTER TABLE compras
  ADD PRIMARY KEY (comp_id),
  ADD KEY fk_comp_usr_id (usr_id),
  ADD KEY fk_comp_plan_id (plan_id);

ALTER TABLE contenidos
  ADD PRIMARY KEY (cont_id);

ALTER TABLE contenidos_planes
  ADD PRIMARY KEY (cp_id),
  ADD KEY fk_cp_cont_id (cont_id),
  ADD KEY fk_cp_plan_id (plan_id);

ALTER TABLE imagenes
  ADD PRIMARY KEY (ima_id),
  ADD KEY fk_ima_cont_id (cont_id);

ALTER TABLE licencias
  ADD PRIMARY KEY (lic_id),
  ADD KEY fk_lic_usr_id (usr_id),
  ADD KEY fk_lic_plan_id (plan_id);

ALTER TABLE login
  ADD PRIMARY KEY (usr_id),
  ADD UNIQUE KEY log_email (log_email);

ALTER TABLE planes
  ADD PRIMARY KEY (plan_id),
  ADD UNIQUE KEY plan_nombre (plan_nombre);

ALTER TABLE usuarios
  ADD KEY fk_usr_usr_id (usr_id);


ALTER TABLE cambios
  MODIFY cam_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE comentarios
  MODIFY com_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE contenidos
  MODIFY cont_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE contenidos_planes
  MODIFY cp_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE imagenes
  MODIFY ima_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE licencias
  MODIFY lic_id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE planes
  MODIFY plan_id int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE cambios
  ADD CONSTRAINT fk_cam_cont_id FOREIGN KEY (cont_id) REFERENCES contenidos (cont_id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT fk_cam_usr_id FOREIGN KEY (usr_id) REFERENCES usuarios (usr_id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE comentarios
  ADD CONSTRAINT fk_com_cont_id FOREIGN KEY (cont_id) REFERENCES contenidos (cont_id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT fk_com_usr_id FOREIGN KEY (usr_id) REFERENCES usuarios (usr_id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE compras
  ADD CONSTRAINT fk_comp_plan_id FOREIGN KEY (plan_id) REFERENCES planes (plan_id) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT fk_comp_usr_id FOREIGN KEY (usr_id) REFERENCES usuarios (usr_id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE contenidos_planes
  ADD CONSTRAINT fk_cp_cont_id FOREIGN KEY (cont_id) REFERENCES contenidos (cont_id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT fk_cp_plan_id FOREIGN KEY (plan_id) REFERENCES planes (plan_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE imagenes
  ADD CONSTRAINT fk_ima_cont_id FOREIGN KEY (cont_id) REFERENCES contenidos (cont_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE licencias
  ADD CONSTRAINT fk_lic_plan_id FOREIGN KEY (plan_id) REFERENCES planes (plan_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT fk_lic_usr_id FOREIGN KEY (usr_id) REFERENCES login (usr_id) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE usuarios
  ADD CONSTRAINT fk_usr_usr_id FOREIGN KEY (usr_id) REFERENCES login (usr_id) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
