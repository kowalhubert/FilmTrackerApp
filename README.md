# Film Tracker Application

Aplikacja umożliwia użytkownikom zarządzanie bazą obejrzanych filmów. Pozwala na dodawanie nowych tytułów, edytowanie ich danych, usuwanie filmów, a także wyświetlanie całej biblioteki. Dodatkowo, użytkownicy mogą wyszukiwać filmy po tytule oraz sortować je według różnych parametrów, takich jak ocena, data wydania czy czas trwania.

## Technologie

- **Backend**: Spring Boot, MongoDB
- **Frontend**: React, Axios
- **Baza danych**: MongoDB

## Instalacja

### Backend (Spring Boot)

1. **Skopiuj repozytorium**:

    ```bash
    git clone https://github.com/kowalhubert/FilmTrackerApp.git
    ```

2. **Zainstaluj zależności**: Upewnij się, że masz zainstalowane JDK 11 lub wyższe oraz Maven.

    ```bash
    mvn clean install
    ```

3. **Konfiguracja MongoDB**: Upewnij się, że masz zainstalowane i uruchomione MongoDB na swoim komputerze lub masz dostęp do instancji MongoDB w chmurze (np. MongoDB Atlas).

    Aby uruchomić MongoDB lokalnie, użyj poniższej komendy:

    ```bash
    mongod
    ```

4. **Uruchom aplikację Spring Boot**: Uruchom aplikację za pomocą Mavena:

    ```bash
    mvn spring-boot:run
    ```

    Backend powinien teraz działać na porcie: `http://localhost:8080`.

### Frontend (React)

1. **Zainstaluj zależności**: Przejdź do folderu projektu frontendowego i zainstaluj wszystkie zależności:

    ```bash
    cd film-database-frontend
    npm install
    ```

2. **Uruchom aplikację frontendową**: Po zainstalowaniu zależności uruchom aplikację React:

    ```bash
    npm start
    ```

    Aplikacja frontendowa powinna teraz działać na porcie: `http://localhost:3000`.

## Używanie aplikacji

### Główne funkcje:

- **Dodaj Film**: Możesz dodać nowy film poprzez formularz. Musisz podać tytuł, reżysera, czas trwania, datę wydania oraz ocenę.
- **Edytuj Film**: Możesz edytować istniejący film, zmieniając wszystkie dane.
- **Usuń Film**: Możesz usunąć film z bazy danych.


https://github.com/user-attachments/assets/2f9c8436-c534-44ef-adc4-12c8c01153ed

