const dashboards = [
  {"id":1,"titulo":"Asesor Disciplinar","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMzM4YTllZGUtOGQ1Yy00MWQ5LWFkN2UtNWFhMmViY2MxZTVkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"SNIES - Sistema Académico","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":2,"titulo":"CAI Cátedra Generación Siglo 21 V2","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMWFkODZhODgtOTVmZi00ZTFhLTlmZjgtMDlhZjlhNjA0N2YwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma CAI","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":3,"titulo":"CAI Viviendo el MEDIT","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiZjdhZmFjYjEtZTUyMi00NzUwLTg0YzItMjEyYjgyNWZjYTBkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma CAI","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":4,"titulo":"Campo Multidimensional de Aprendizaje (CMA)","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMzdlYjNhNDAtYzQzOC00ZmRhLTk5NTktNWQ2YzA4NGI5YTc0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico - CMA","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":5,"titulo":"Diagnósticos y Nivelatorios - Informe","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiZWQwOTI0ZDYtZTYxNC00MGFmLWE1OTUtNTM4MzViZDcwNDNkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Diagnósticos","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":6,"titulo":"Ingresos a Campo Multidimensional de Aprendizaje","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiMDNjYzVmNjYtYzI4OS00NGEwLWJlNDgtODMzY2M2ZDMzY2Q2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico - CMA","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":7,"titulo":"Monitorías","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMjdlNTVkNmItMDMwZi00ZjlkLWJhNzktNWYwMWQyYWY4MGFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Monitorías","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":8,"titulo":"Tránsito de la Educación Media a la Educación Superior","area":"Oficina de Desarrollo Académico","macroproceso":"Misional","subproceso":"Admisiones y Registro","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiN2IwOWQ0MTAtZjY1Mi00YmRjLTg2MmItYTJlYmZjZDk1YjY1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"SNIES - ICFES","elaboradoPor":"Oficina de Desarrollo Académico"},
  {"id":9,"titulo":"Asesor Disciplinar","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiOTE5MTcyZjAtYjNkNy00ZTE0LTgyMDItNGQ0MGE4OTZlMDk0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma Virtual","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":10,"titulo":"Asesor Disciplinar V2","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiMzM4YTllZGUtOGQ1Yy00MWQ5LWFkN2UtNWFhMmViY2MxZTVkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma Virtual","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":11,"titulo":"CAI Cátedra Generación Siglo 21","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiNjQ3ODYwNzItZDRlMi00ZDljLTk1ODQtNjJlMGY1YTI2NTJjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma CAI","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":12,"titulo":"CAI Cátedra Generación Siglo 21 V2","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMWFkODZhODgtOTVmZi00ZTFhLTlmZjgtMDlhZjlhNjA0N2YwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma CAI","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":13,"titulo":"CAI Viviendo el MEDIT","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiZjdhZmFjYjEtZTUyMi00NzUwLTg0YzItMjEyYjgyNWZjYTBkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma CAI","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":14,"titulo":"Campo Multidimensional de Aprendizaje (CMA)","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMzdlYjNhNDAtYzQzOC00ZmRhLTk5NTktNWQ2YzA4NGI5YTc0IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico - CMA","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":15,"titulo":"Campo Multidimensional de Aprendizaje (CMA) - Posgrados","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiY2RiZTJjMzktNGVhOC00YmZhLWFkNzItNTUzOTlhZTYyNTc4IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico - CMA","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":16,"titulo":"Cursos Autogestionados","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiOTBhNThkMTktNmU0OC00YmM5LTkyNDktNGFjMTA5NGFmNTdmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma Virtual","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":17,"titulo":"Diagnósticos y Nivelatorios - Informe","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiZWQwOTI0ZDYtZTYxNC00MGFmLWE1OTUtNTM4MzViZDcwNDNkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Diagnósticos","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":18,"titulo":"Graduados UCundinamarca","area":"Graduados","macroproceso":"Misional","subproceso":"Graduados","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiZjZkZmQ1MzUtMjA4Yy00OTIzLWE5N2QtMmU4NTE1Y2UwMWY5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Graduados - SNIES","elaboradoPor":"Oficina de Graduados"},
  {"id":19,"titulo":"Informe Final","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiYzdiN2I2ZWQtOWY4ZS00MWJiLWIyODUtZTViY2Q0ZTc3NDc2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":20,"titulo":"Ingresos a Campo Multidimensional de Aprendizaje","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiMDNjYzVmNjYtYzI4OS00NGEwLWJlNDgtODMzY2M2ZDMzY2Q2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico - CMA","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":21,"titulo":"Insignias Digitales","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiYWQ1MmJiNzQtNzJkZS00MzYzLTg4YWEtMjFjOTAxNDMzYWJjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma de Insignias","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":22,"titulo":"Inventario de Recursos Educativos Digitales","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiN2JlODU1MGQtM2FiNi00NWU4LWI1YjItNWVmMGZlMmNlM2I5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Repositorio Institucional","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":23,"titulo":"Monitorías","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMjdlNTVkNmItMDMwZi00ZjlkLWJhNzktNWYwMWQyYWY4MGFjIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Monitorías","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":24,"titulo":"Posgrados","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiMjFiNDQ4ODQtMWE4Mi00YjFmLWJiOTYtYWU1MGViNjQzOWI1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":25,"titulo":"Tránsito de la Educación Media a la Educación Superior","area":"Oficina de Educación Virtual y a Distancia","macroproceso":"Misional","subproceso":"Admisiones y Registro","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiN2IwOWQ0MTAtZjY1Mi00YmRjLTg2MmItYTJlYmZjZDk1YjY1IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"SNIES - ICFES","elaboradoPor":"Oficina de Educación Virtual"},
  {"id":26,"titulo":"Indicadores del Sistema de Gestión Ambiental","area":"Sistema de Gestión Ambiental","macroproceso":"Estratégico","subproceso":"Sistemas Integrados","tipo":"Público","url":"https://www.ucundinamarca.edu.co/index.php/servicios2022/sistema-de-gestion-ambiental","fechaActualizacion":"15/01/2025","fuente":"Sistema de Gestión Ambiental","elaboradoPor":"Coordinación SGA"},
  {"id":27,"titulo":"Procesos de Contratación","area":"Oficina de Compras","macroproceso":"Apoyo","subproceso":"Bienes y Servicios","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiZTJkYjJlNmYtZjY3MC00Y2YxLWI2YzctNzNmMTUyYTlkNGU3IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Contratación - SECOP","elaboradoPor":"Oficina de Compras"},
  {"id":29,"titulo":"Participación en Eventos de SGSI","area":"Sistema de Gestión de Seguridad de la Información - SGSI","macroproceso":"Estratégico","subproceso":"Sistemas Integrados","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiYzAyMTE5MzktZWNhNS00ZmQ0LWFjNmMtYjNmNmE4ODViYTQ5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema SGSI","elaboradoPor":"Coordinación SGSI"},
  {"id":30,"titulo":"Tablero de Planes de Mejoramiento","area":"Control Interno","macroproceso":"Seguimiento","subproceso":"Control Interno","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiYzBmNDk1MGYtZjJiYi00OTBlLWI4ZDMtMWVhZDFjMDc0ZGUxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Control Interno","elaboradoPor":"Oficina de Control Interno"},
  {"id":31,"titulo":"Seguimiento de Proyectos","area":"Dirección de Investigación","macroproceso":"Misional","subproceso":"Ciencia, Tecnología e Innovación","tipo":"Público","url":"https://www.ucundinamarca.edu.co/investigacion/index.php/proyectos","fechaActualizacion":"15/01/2025","fuente":"Sistema de Investigación","elaboradoPor":"Dirección de Investigación"},
  {"id":32,"titulo":"Ejecución Activa","area":"Vicerrectoría Administrativa y Financiera","macroproceso":"Apoyo","subproceso":"Financiera","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiM2UzMWM0ODEtYmMwNC00NzUzLWEyM2YtOThiMzAwZjZmMzRlIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Financiero SAP","elaboradoPor":"Vicerrectoría Administrativa"},
  {"id":33,"titulo":"Ejecución Pasiva","area":"Vicerrectoría Administrativa y Financiera","macroproceso":"Apoyo","subproceso":"Financiera","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiMWE4NGI1N2EtNGY2OC00MmMyLTkzMjMtYWUxZjA5OTk2ZGVhIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Financiero SAP","elaboradoPor":"Vicerrectoría Administrativa"},
  {"id":34,"titulo":"Planes de Mejoramiento","area":"Vicerrectoría Administrativa y Financiera","macroproceso":"Apoyo","subproceso":"Financiera","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiYjFhMTE5MjgtZjRmZS00ZDQzLWE3ZTktNjMyZDdiNjRhODlkIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Mejoramiento","elaboradoPor":"Vicerrectoría Administrativa"},
  {"id":35,"titulo":"Plan Mensual de Contratación","area":"Vicerrectoría Administrativa y Financiera","macroproceso":"Apoyo","subproceso":"Bienes y Servicios","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiZmNkOWQ1MTItOTM0Yy00YjgyLWFkNGYtNzEwNjBmNzM3YWM2IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Contratación","elaboradoPor":"Vicerrectoría Administrativa"},
  {"id":36,"titulo":"Conexión Líneas de Profundización Pregrado-Posgrados","area":"Instituto de Posgrados","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiYTBmN2M3YjctOGFiMS00OWYyLWJkNGItOWVkM2VjNDgyZDIxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico - SNIES","elaboradoPor":"Instituto de Posgrados"},
  {"id":37,"titulo":"Perfil de Estudiantes IDEP","area":"Instituto de Posgrados","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiMGE4MjRlOWUtMDM5MC00YmFlLWJlYTEtZTgxNGUzOGVmYTIwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico","elaboradoPor":"Instituto de Posgrados"},
  {"id":38,"titulo":"Encuesta de Satisfacción de Programas","area":"Instituto de Posgrados","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiYjEyOTYyN2MtNmZhYy00YjAzLThjNDgtMmU3Yjg1OWM1ZTQwIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Encuestas","elaboradoPor":"Instituto de Posgrados"},
  {"id":39,"titulo":"Reporte de Opciones de Grado","area":"Instituto de Posgrados","macroproceso":"Misional","subproceso":"Formación y Aprendizaje","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiODJlMjM2MTctOWI4NS00NzBjLWE4NTYtNDQxNzdkNzRhMWVmIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico","elaboradoPor":"Instituto de Posgrados"},
  {"id":40,"titulo":"Boletín Estadístico","area":"Dirección de Planeación","macroproceso":"Estratégico","subproceso":"Planeación Institucional","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiZTYyOWU0ZGQtNzUxNS00MTdjLTgxMTMtODRjNzc4NThkMTYxIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Planeación - SNIES","elaboradoPor":"Dirección de Planeación"},
  {"id":41,"titulo":"Deserción","area":"Dirección de Planeación","macroproceso":"Estratégico","subproceso":"Planeación Institucional","tipo":"Privado","url":"https://app.powerbi.com/view?r=eyJrIjoiYTY0MDk3MDAtZDIzMy00MTk3LThlZmItYzgyNzk3YWU3YjNhIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema Académico - SPADIES","elaboradoPor":"Dirección de Planeación"},
  {"id":42,"titulo":"Calendario Institucional","area":"Dirección de Planeación","macroproceso":"Estratégico","subproceso":"Planeación Institucional","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiOTQzMDgxODgtMTFkYS00YWU2LWE2NTAtMjI0OTFiMTBmNWY5IiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Sistema de Planeación","elaboradoPor":"Dirección de Planeación"},
  {"id":43,"titulo":"CAI Encuentros Dialógicos y Formativos","area":"Dirección de Planeación","macroproceso":"Estratégico","subproceso":"Direccionamiento Estratégico","tipo":"Público","url":"https://app.powerbi.com/view?r=eyJrIjoiMjFlYmIzOTUtMDcyMy00MGNiLTllZjktNTY2ZjM2ZjgxMmVlIiwidCI6IjA3ZGE2N2EwLTFmNDMtNGU4Yy05NzdmLTVmODhiNjQ3MGVlNiIsImMiOjR9","fechaActualizacion":"15/01/2025","fuente":"Plataforma CAI","elaboradoPor":"Dirección de Planeación"}
];

const MACROPROCESOS = {
  'Estratégico': {
    icon: 'fa-bullseye',
    color: 'estrategico',
    areas: ['Dirección de Planeación', 'Sistema de Gestión Ambiental', 'Sistema de Gestión de Seguridad de la Información - SGSI']
  },
  'Misional': {
    icon: 'fa-users',
    color: 'misional',
    areas: [
      'Oficina de Desarrollo Académico',
      'Oficina de Educación Virtual y a Distancia',
      'Instituto de Posgrados',
      'Graduados',
      'Dirección de Investigación'
    ]
  },
  'Apoyo': {
    icon: 'fa-handshake',
    color: 'apoyo',
    areas: [
      'Vicerrectoría Administrativa y Financiera',
      'Oficina de Compras'
    ]
  },
  'Seguimiento': {
    icon: 'fa-search',
    color: 'seguimiento',
    areas: [
      'Control Interno'
    ]
  }
};

const AREA_ICONS = {
  'Oficina de Desarrollo Académico': 'fa-chalkboard-teacher',
  'Oficina de Educación Virtual y a Distancia': 'fa-laptop-code',
  'Instituto de Posgrados': 'fa-user-graduate',
  'Graduados': 'fa-graduation-cap',
  'Dirección de Investigación': 'fa-microscope',
  'Dirección de Planeación': 'fa-sitemap',
  'Sistema de Gestión Ambiental': 'fa-leaf',
  'Sistema de Gestión de Seguridad de la Información - SGSI': 'fa-shield-alt',
  'Vicerrectoría Administrativa y Financiera': 'fa-coins',
  'Oficina de Compras': 'fa-shopping-cart',
  'Control Interno': 'fa-clipboard-check'
};

let isAuthenticated = false;
let currentDashboard = null;
let currentView = 'home';
let topProgramsChartInstance = null;
let map = null;
let mapCircles = [];
let isFullscreen = false;
let expandedMacroprocesos = {};
let expandedAreas = {};

const studentData = [
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Contaduría Pública","Estudiantes":801},
  {"MUNICIPIO_PROGRAMA":"Soacha","Programa":"Ingeniería Industrial","Estudiantes":764},
  {"MUNICIPIO_PROGRAMA":"Facatativá","Programa":"Psicología","Estudiantes":530},
  {"MUNICIPIO_PROGRAMA":"Facatativá","Programa":"Contaduría Pública","Estudiantes":934},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Doctorado En Ciencias De La Educación","Estudiantes":22},
  {"MUNICIPIO_PROGRAMA":"Soacha","Programa":"Profesional En Ciencias Del Deporte","Estudiantes":932},
  {"MUNICIPIO_PROGRAMA":"Chía","Programa":"Administración De Empresas","Estudiantes":721},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Ingeniería Electrónica","Estudiantes":511},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Gestión Pública","Estudiantes":63},
  {"MUNICIPIO_PROGRAMA":"Zipaquirá","Programa":"Música","Estudiantes":286},
  {"MUNICIPIO_PROGRAMA":"Ubaté","Programa":"Contaduría Pública","Estudiantes":514},
  {"MUNICIPIO_PROGRAMA":"Chía","Programa":"Contaduría Pública","Estudiantes":477},
  {"MUNICIPIO_PROGRAMA":"Chía","Programa":"Ingeniería De Sistemas Y Computación","Estudiantes":956},
  {"MUNICIPIO_PROGRAMA":"Chía","Programa":"Ingeniería Mecatrónica","Estudiantes":237},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Licenciatura En Ciencias Sociales","Estudiantes":242},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Analítica Aplicada A Negocios","Estudiantes":54},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Administración De Empresas","Estudiantes":866},
  {"MUNICIPIO_PROGRAMA":"Chía","Programa":"Ingeniería Industrial","Estudiantes":308},
  {"MUNICIPIO_PROGRAMA":"Soacha","Programa":"Contaduría Pública","Estudiantes":46},
  {"MUNICIPIO_PROGRAMA":"Facatativá","Programa":"Administración De Empresas","Estudiantes":847},
  {"MUNICIPIO_PROGRAMA":"Facatativá","Programa":"Ingeniería Agronómica","Estudiantes":400},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Ingeniería Agronómica","Estudiantes":459},
  {"MUNICIPIO_PROGRAMA":"Soacha","Programa":"Ingeniería Topográfica Y Geomática","Estudiantes":26},
  {"MUNICIPIO_PROGRAMA":"Facatativá","Programa":"Ingeniería De Sistemas Y Computación","Estudiantes":951},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Maestría En Educación","Estudiantes":6},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Analítica Y Ciencia De Datos","Estudiantes":35},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Zootecnia","Estudiantes":470},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Agroecología Y Desarrollo Agro Ecoturístico","Estudiantes":12},
  {"MUNICIPIO_PROGRAMA":"Soacha","Programa":"Administración De Empresas","Estudiantes":173},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Gerencia Para La Transformación Digital","Estudiantes":78},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Licenciatura En Educación Física, Recreación Y Deportes","Estudiantes":180},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Marketing Digital","Estudiantes":36},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Ingeniería De Sistemas Y Computación","Estudiantes":1017},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Gerencia Financiera Y Contable","Estudiantes":6},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Metodologías De Calidad Para El Desarrollo Del Software","Estudiantes":38},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Educación Ambiental Y Desarrollo De La Comunidad","Estudiantes":14},
  {"MUNICIPIO_PROGRAMA":"Facatativá","Programa":"Especialización En Gerencia Para El Desarrollo Organizacional","Estudiantes":20},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Maestría En Ciencias Ambientales","Estudiantes":4},
  {"MUNICIPIO_PROGRAMA":"Soacha","Programa":"Tecnología En Desarrollo De Software","Estudiantes":71},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Infraestructura Y Seguridad De Redes","Estudiantes":16},
  {"MUNICIPIO_PROGRAMA":"Soacha","Programa":"Ingeniería De Software","Estudiantes":526},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Especialización En Agronegocios Sostenibles","Estudiantes":18},
  {"MUNICIPIO_PROGRAMA":"Ubaté","Programa":"Ingeniería De Sistemas Y Computación","Estudiantes":421},
  {"MUNICIPIO_PROGRAMA":"Ubaté","Programa":"Ingeniería De Sistemas","Estudiantes":94},
  {"MUNICIPIO_PROGRAMA":"Fusagasugá","Programa":"Tecnología En Cartografía","Estudiantes":2},
  {"MUNICIPIO_PROGRAMA":"Girardot","Programa":"Administración De Empresas","Estudiantes":629},
  {"MUNICIPIO_PROGRAMA":"Facatativá","Programa":"Ingeniería Ambiental","Estudiantes":486},
  {"MUNICIPIO_PROGRAMA":"Girardot","Programa":"Enfermería","Estudiantes":555},
  {"MUNICIPIO_PROGRAMA":"Girardot","Programa":"Ingeniería Ambiental","Estudiantes":364},
  {"MUNICIPIO_PROGRAMA":"Girardot","Programa":"Ingeniería De Software","Estudiantes":346},
  {"MUNICIPIO_PROGRAMA":"Girardot","Programa":"Tecnología En Gestión Turística Y Hotelera","Estudiantes":5},
  {"MUNICIPIO_PROGRAMA":"Ubaté","Programa":"Zootecnia","Estudiantes":399},
  {"MUNICIPIO_PROGRAMA":"Ubaté","Programa":"Administración De Empresas","Estudiantes":366},
  {"MUNICIPIO_PROGRAMA":"Ubaté","Programa":"Medicina Veterinaria Y Zootecnia","Estudiantes":56}
];

// Navegación
function navigateTo(view) {
  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById(`${view}View`).classList.add('active');
  currentView = view;
  
  if (view === 'estudiantes') {
    renderEstudiantesDashboards();
  } else if (view === 'administrativos') {
    // Mostrar pantalla de selección por defecto
    document.getElementById('adminSelectionSection').style.display = 'block';
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('publicDashboardsSection').classList.add('hidden');
    document.getElementById('adminDashboardsSection').classList.add('hidden');
  }
}

// Funciones para la sección administrativos
function showPublicDashboards() {
  document.getElementById('adminSelectionSection').style.display = 'none';
  document.getElementById('publicDashboardsSection').classList.remove('hidden');
  renderPublicAdminDashboards();
}

function showLoginSection() {
  document.getElementById('adminSelectionSection').style.display = 'none';
  document.getElementById('loginSection').classList.remove('hidden');
}

function backToAdminSelection() {
  document.getElementById('adminSelectionSection').style.display = 'block';
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('publicDashboardsSection').classList.add('hidden');
  document.getElementById('adminDashboardsSection').classList.add('hidden');
  document.getElementById('adminUsername').value = '';
  document.getElementById('adminPassword').value = '';
  document.getElementById('adminLoginError').classList.add('hidden');
}

// Login administrativo
function handleAdminLogin() {
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;
  
  if (username === 'admin' && password === 'udec2024') {
    isAuthenticated = true;
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('adminDashboardsSection').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');
    renderAdministrativosDashboards();
  } else {
    const error = document.getElementById('adminLoginError');
    error.textContent = 'Usuario o contraseña incorrectos';
    error.classList.remove('hidden');
  }
}

function logout() {
  isAuthenticated = false;
  document.getElementById('logoutBtn').classList.add('hidden');
  backToAdminSelection();
}

// Toggle macroproceso
function toggleMacroproceso(macroproceso) {
  const content = document.getElementById(`content-${macroproceso}`);
  const icon = document.getElementById(`icon-${macroproceso}`);
  
  if (!content || !icon) return;
  
  if (expandedMacroprocesos[macroproceso]) {
    content.classList.remove('expanded');
    icon.classList.remove('expanded');
    expandedMacroprocesos[macroproceso] = false;
  } else {
    content.classList.add('expanded');
    icon.classList.add('expanded');
    expandedMacroprocesos[macroproceso] = true;
  }
}

// Toggle área
function toggleArea(areaId) {
  const container = document.getElementById(`dashboards-${areaId}`);
  const card = document.getElementById(`area-card-${areaId}`);
  
  if (!container || !card) return;
  
  if (expandedAreas[areaId]) {
    container.classList.remove('expanded');
    card.classList.remove('expanded');
    expandedAreas[areaId] = false;
  } else {
    container.classList.add('expanded');
    card.classList.add('expanded');
    expandedAreas[areaId] = true;
  }
}

// Crear tarjeta de área con tableros
function createAreaCard(area, dashboardsInArea, macroprocesoColor, index) {
  const areaId = area.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  const iconClass = AREA_ICONS[area] || 'fa-folder-open';
  const dashboardCount = dashboardsInArea.length;
  
  return `
    <div class="area-card" id="area-card-${areaId}" onclick="toggleArea('${areaId}')" style="animation-delay: ${index * 0.1}s;">
      <div class="area-card-header">
        <div class="area-card-icon ${macroprocesoColor}">
          <i class="fas ${iconClass}"></i>
        </div>
        <div class="area-card-info">
          <div class="area-card-title">${area}</div>
          <div class="area-card-subtitle">
            <span class="area-card-badge">
              <i class="fas fa-chart-bar"></i>
              ${dashboardCount} tablero${dashboardCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <i class="fas fa-chevron-down area-card-expand"></i>
      </div>
      <div class="area-dashboards-container" id="dashboards-${areaId}">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${dashboardsInArea.map(d => createDashboardCard(d)).join('')}
        </div>
      </div>
    </div>
  `;
}

// Renderizar dashboards por macroproceso
function renderEstudiantesDashboards() {
  const container = document.getElementById('estudiantesDashboards');
  const estudiantesDashboards = dashboards.filter(d => 
    d.macroproceso === 'Misional' && d.tipo === 'Público'
  );
  
  const grouped = {};
  estudiantesDashboards.forEach(d => {
    if (!grouped[d.area]) grouped[d.area] = [];
    grouped[d.area].push(d);
  });
  
  const config = MACROPROCESOS['Misional'];
  
  container.innerHTML = `
    <div class="macroproceso-section ${config.color}">
      <div class="macroproceso-header" onclick="toggleMacroproceso('estudiantes-Misional')">
        <div class="macroproceso-title">
          <div class="macroproceso-icon">
            <i class="fas ${config.icon}"></i>
          </div>
          <span>Macroproceso Misional</span>
        </div>
        <i class="fas fa-chevron-down collapse-icon expanded" id="icon-estudiantes-Misional"></i>
      </div>
      <div class="macroproceso-content expanded" id="content-estudiantes-Misional">
        ${Object.entries(grouped).map(([area, items], index) => 
          createAreaCard(area, items, config.color, index)
        ).join('')}
      </div>
    </div>
  `;
  
  expandedMacroprocesos['estudiantes-Misional'] = true;
}

function renderPublicAdminDashboards() {
  const container = document.getElementById('publicDashboards');
  const publicAdminDashboards = dashboards.filter(d => 
    d.macroproceso !== 'Misional' && d.tipo === 'Público'
  );
  
  container.innerHTML = Object.entries(MACROPROCESOS)
    .filter(([nombre]) => nombre !== 'Misional')
    .map(([nombre, config]) => {
      const dashboardsDelMacroproceso = publicAdminDashboards.filter(d => 
        config.areas.includes(d.area)
      );
      
      if (dashboardsDelMacroproceso.length === 0) return '';
      
      const grouped = {};
      dashboardsDelMacroproceso.forEach(d => {
        if (!grouped[d.area]) grouped[d.area] = [];
        grouped[d.area].push(d);
      });
      
      return `
        <div class="macroproceso-section ${config.color}">
          <div class="macroproceso-header" onclick="toggleMacroproceso('public-${nombre}')">
            <div class="macroproceso-title">
              <div class="macroproceso-icon">
                <i class="fas ${config.icon}"></i>
              </div>
              <span>Macroproceso ${nombre}</span>
            </div>
            <i class="fas fa-chevron-down collapse-icon" id="icon-public-${nombre}"></i>
          </div>
          <div class="macroproceso-content" id="content-public-${nombre}">
            ${Object.entries(grouped).map(([area, items], index) => 
              createAreaCard(area, items, config.color, index)
            ).join('')}
          </div>
        </div>
      `;
    }).join('');
}

function renderAdministrativosDashboards() {
  const container = document.getElementById('administrativosDashboards');
  const adminDashboards = dashboards.filter(d => 
    d.tipo === 'Privado'
  );
  
  container.innerHTML = Object.entries(MACROPROCESOS).map(([nombre, config]) => {
    const dashboardsDelMacroproceso = adminDashboards.filter(d => 
      config.areas.includes(d.area)
    );
    
    if (dashboardsDelMacroproceso.length === 0) return '';
    
    const grouped = {};
    dashboardsDelMacroproceso.forEach(d => {
      if (!grouped[d.area]) grouped[d.area] = [];
      grouped[d.area].push(d);
    });
    
    return `
      <div class="macroproceso-section ${config.color}">
        <div class="macroproceso-header" onclick="toggleMacroproceso('admin-${nombre}')">
          <div class="macroproceso-title">
            <div class="macroproceso-icon">
              <i class="fas ${config.icon}"></i>
            </div>
            <span>Macroproceso ${nombre}</span>
          </div>
          <i class="fas fa-chevron-down collapse-icon" id="icon-admin-${nombre}"></i>
        </div>
        <div class="macroproceso-content" id="content-admin-${nombre}">
          ${Object.entries(grouped).map(([area, items], index) => 
            createAreaCard(area, items, config.color, index)
          ).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function createDashboardCard(dashboard) {
  const isPrivate = dashboard.tipo === 'Privado';
  const accentColor = isPrivate ? 'secondary' : 'primary';
  const iconColor = isPrivate ? 'blue' : 'green';
  
  return `
    <div class="dashboard-card ${isPrivate ? 'private' : ''}">
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <h4 class="font-bold text-gray-800 flex-1 pr-2 text-base leading-tight">${dashboard.titulo}</h4>
          <i class="fas fa-${isPrivate ? 'lock' : 'unlock'} text-${iconColor}-500 flex-shrink-0"></i>
        </div>
        <div class="dashboard-metadata">
          <div class="dashboard-metadata-item">
            <i class="fas fa-calendar-alt"></i>
            <span><strong>Actualización:</strong> ${dashboard.fechaActualizacion}</span>
          </div>
          <div class="dashboard-metadata-item">
            <i class="fas fa-database"></i>
            <span><strong>Fuente:</strong> ${dashboard.fuente}</span>
          </div>
          <div class="dashboard-metadata-item">
            <i class="fas fa-user-edit"></i>
            <span><strong>Elaborado por:</strong> ${dashboard.elaboradoPor}</span>
          </div>
        </div>
        <button onclick="openDashboard(${dashboard.id})" class="btn-${accentColor} w-full justify-center mt-4">
          <i class="fas fa-chart-line"></i><span>Ver Dashboard</span>
        </button>
      </div>
    </div>
  `;
}

// Modal dashboard
function openDashboard(id) {
  const dashboard = dashboards.find(d => d.id === id);
  if (!dashboard) return;
  
  currentDashboard = dashboard;
  document.getElementById('modalTitle').textContent = dashboard.titulo;
  document.getElementById('modalArea').textContent = dashboard.area;
  document.getElementById('modalType').innerHTML = dashboard.tipo === 'Privado' 
    ? '<i class="fas fa-lock text-blue-500"></i> <span class="text-blue-700">Privado</span>' 
    : '<i class="fas fa-unlock text-green-500"></i> <span class="text-green-700">Público</span>';
  document.getElementById('iframeContainer').innerHTML = 
    `<iframe src="${dashboard.url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
  document.getElementById('dashboardModal').classList.add('active');
}

function closeDashboardModal() {
  document.getElementById('dashboardModal').classList.remove('active');
  document.getElementById('iframeContainer').innerHTML = '';
  currentDashboard = null;
}

function openInNewTab() {
  if (currentDashboard) {
    window.open(currentDashboard.url, '_blank');
  }
}

// Mapa
function initializeMap() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded.');
    return;
  }

  const mapData = [
    { name: "Fusagasugá", coords: [4.3391, -74.3636], students: 5028 },
    { name: "Soacha", coords: [4.579, -74.214], students: 3644 },
    { name: "Facatativá", coords: [4.814, -74.356], students: 4706 },
    { name: "Chía", coords: [4.858, -74.053], students: 3887 },
    { name: "Ubaté", coords: [5.313, -73.816], students: 1474 },
    { name: "Girardot", coords: [4.304, -74.804], students: 2649 },
    { name: "Zipaquirá", coords: [5.025, -74.004], students: 295 }
  ];

  map = L.map('map', {
    center: [4.5, -74.0],
    zoom: 8,
    scrollWheelZoom: true,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  const maxStudents = Math.max(...mapData.map(item => item.students));

  mapData.forEach((municipality) => {
    const baseRadius = (municipality.students / maxStudents) * 15000;
    
    const circle = L.circle(municipality.coords, {
      color: '#16a34a',
      fillColor: '#22c55e',
      fillOpacity: 0.6,
      radius: baseRadius,
      weight: 2
    }).addTo(map);

    mapCircles.push({ circle, baseRadius, municipality });

    const popupContent = `
      <div style="text-align: center; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #16a34a; font-size: 16px; font-weight: bold;">
          ${municipality.name}
        </h3>
        <div style="font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">
          ${municipality.students.toLocaleString('es-CO')}
        </div>
        <div style="font-size: 12px; color: #6b7280;">
          Estudiantes
        </div>
      </div>
    `;

    circle.bindPopup(popupContent);

    const tooltipContent = `
      <strong>${municipality.name}</strong><br>
      ${municipality.students.toLocaleString('es-CO')} estudiantes
    `;

    circle.bindTooltip(tooltipContent, {
      permanent: false,
      direction: 'top',
      className: 'custom-tooltip'
    });

    const markerHtml = `
      <div style="
        background: white;
        border: 2px solid #16a34a;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 10px;
        color: #16a34a;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <i class="fas fa-map-marker-alt"></i>
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: markerHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker(municipality.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  map.on('zoomend', function() {
    const currentZoom = map.getZoom();
    const zoomFactor = Math.pow(1.15, currentZoom - 8);
    
    mapCircles.forEach(({ circle, baseRadius }) => {
      const maxScale = 3;
      const minScale = 0.5;
      const finalScale = Math.min(Math.max(zoomFactor, minScale), maxScale);
      circle.setRadius(baseRadius * finalScale);
    });
  });
}

// Pantalla completa del mapa
function toggleFullscreenMap() {
  const mapContainer = document.getElementById('map').parentElement;
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  
  if (!isFullscreen) {
    if (mapContainer.requestFullscreen) {
      mapContainer.requestFullscreen();
    } else if (mapContainer.webkitRequestFullscreen) {
      mapContainer.webkitRequestFullscreen();
    } else if (mapContainer.msRequestFullscreen) {
      mapContainer.msRequestFullscreen();
    }
    
    isFullscreen = true;
    fullscreenIcon.classList.remove('fa-expand');
    fullscreenIcon.classList.add('fa-compress');
    
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    isFullscreen = false;
    fullscreenIcon.classList.remove('fa-compress');
    fullscreenIcon.classList.add('fa-expand');
    
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }
}

document.addEventListener('fullscreenchange', function() {
  if (!document.fullscreenElement) {
    isFullscreen = false;
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    if (fullscreenIcon) {
      fullscreenIcon.classList.remove('fa-compress');
      fullscreenIcon.classList.add('fa-expand');
      setTimeout(() => map.invalidateSize(), 300);
    }
  }
});

// Métricas
function animateCounter(id, end) {
  const element = document.getElementById(id);
  const duration = 1500;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const currentCount = Math.round(end * progress);
    element.textContent = currentCount.toLocaleString('es-CO');
    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = end.toLocaleString('es-CO');
    }
  }, frameRate);
}

function initializeMetrics() {
  animateCounter('totalStudentsCounter', 18390);
  animateCounter('totalProgramsCounter', 54);
  animateCounter('totalCampusesCounter', 7);

  updateTopProgramsChart(5);
}

function updateTopProgramsChart(topN) {
  const programTotals = studentData.reduce((acc, item) => {
    acc[item.Programa] = (acc[item.Programa] || 0) + item.Estudiantes;
    return acc;
  }, {});
  
  const topPrograms = Object.entries(programTotals).sort(([, a], [, b]) => b - a).slice(0, topN);
  renderTopProgramsChart(topPrograms.map(p => p[0]), topPrograms.map(p => p[1]));
}

function renderTopProgramsChart(labels, data) {
  const ctx = document.getElementById('topProgramsChart').getContext('2d');
  if (topProgramsChartInstance) {
    topProgramsChartInstance.destroy();
  }
  topProgramsChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Número de Estudiantes',
        data: data,
        backgroundColor: 'rgba(22, 163, 74, 0.7)',
        borderColor: 'rgba(21, 128, 61, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, grid: { color: '#E5E7EB' } },
        y: { grid: { display: false } }
      }
    }
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('dashboardModal').classList.contains('active')) {
    closeDashboardModal();
  }
  if (e.key === 'Enter' && currentView === 'administrativos' && !isAuthenticated) {
    const loginVisible = !document.getElementById('loginSection').classList.contains('hidden');
    if (loginVisible) {
      handleAdminLogin();
    }
  }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
  initializeMetrics();
});
