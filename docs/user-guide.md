# User Guide – Task Manager

## Overview

A Task Manager egy egyszerű feladatkezelő webalkalmazás, amellyel feladatokat lehet létrehozni, megtekinteni, szerkeszteni és törölni.

---

## Pages

### 1. Task List (`/tasks`)

Az alkalmazás főoldala. Listázza az összes feladatot táblázatos formában.

| Oszlop   | Leírás                          |
|----------|---------------------------------|
| Title    | A feladat neve                  |
| Status   | TODO / IN_PROGRESS / DONE       |
| Deadline | Határidő (ha meg van adva)      |
| Actions  | View / Edit / Delete gombok     |

- **View** – megnyitja a részletes nézetet
- **Edit** – szerkesztési űrlapot nyit meg
- **Delete** – megerősítés után törli a feladatot

---

### 2. New Task (`/tasks/new`)

Új feladat létrehozása.

| Mező        | Kötelező | Leírás                          |
|-------------|----------|---------------------------------|
| Title       | ✅        | A feladat rövid neve            |
| Description | ❌        | Részletes leírás                |
| Status      | ✅        | TODO / IN_PROGRESS / DONE       |
| Deadline    | ❌        | Dátum picker                   |

- **Create** gombra mentés és visszairányítás a listára
- **Cancel** gombra visszairányítás mentés nélkül

---

### 3. Task Detail (`/tasks/:id`)

Egy adott feladat részletes adatai.

- Megjeleníti a title, description, status, deadline mezőket
- **Edit** gomb: szerkesztő oldalra navigál
- **Delete** gomb: megerősítés után törlés
- **Back** gomb: visszatérés a listára

---

### 4. Edit Task (`/tasks/:id/edit`)

Meglévő feladat szerkesztése. Az űrlap előre ki van töltve a jelenlegi adatokkal.

- **Update** gombra mentés
- **Cancel** gombra visszairányítás

---

## Task statuses

| Státusz     | Jelentés              |
|-------------|-----------------------|
| TODO        | Még nem kezdett el    |
| IN_PROGRESS | Folyamatban van       |
| DONE        | Befejezve             |

---

## API Endpoints (Swagger)

Az API dokumentációja elérhető: `http://localhost:5000/swagger`

| Method | Endpoint         | Leírás              |
|--------|------------------|---------------------|
| GET    | /tasks           | Összes feladat      |
| GET    | /tasks/{id}      | Egy feladat         |
| POST   | /tasks           | Új feladat          |
| PUT    | /tasks/{id}      | Feladat frissítése  |
| DELETE | /tasks/{id}      | Feladat törlése     |
