<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>



- [Requirement](#requirement)
- [Run on Local](#run-on-local)
  - [Use PPHP Artisan \& ( NPM / Yarn )](#use-pphp-artisan---npm--yarn-)
  - [Use Xampp](#use-xampp)

---

## Requirement

1. MariaDB - min 10.x
2. PHP - min. 8.1.x
3. Composer  - min. 2.x
4. Node - min. 16.x
6. Xampp (optional)

## Run on Local

### Use PPHP Artisan & ( NPM / Yarn )

> Note
> 1. Every link will use http://localhost:8000
> 2. For xampp, every value "localhost" in 

1. Clone this repository to your local.
2. Open folder application after finish clone repository to local.
3. Setup file `.env` (copy `.env.example` to `.env`)
4. Change and Adjust values in file `.env`.
   1. `APP_URL`, your domain of application (_don't use localhost_). 
   2. `DB_HOST`, endpoint of mysql/mariadb service .
   3. `DB_PORT`, port number of mysql/mariadb.
   4. `DB_DATABASE`, name of database on mysql/mariadb.
   5. `DB_USERNAME`, authenticated username for mysql/mariadb.
   6. `DB_PASSWORD`, authenticated password for mysql/mariadb.
   7. `SANCTUM_STATEFUL_DOMAINS`, your domain of application (_don't use localhost and don't include http:// or https://_).
   8. `SESSION_DOMAIN`, your domain of application (_don't use localhost and don't include http:// or https://_).
5. Build interface  
    if use NPM,
    ``` 
    npm run build
    ```

    if use Yarn,
    ``` 
    yarn build
    ```

6. Execute database migration
    ```
    php artisan migrate
    ```

7. Execute database seeder
    ```
    php artisan db:seed --class=ClientSeeder
    php artisan db:seed --class=ProjectSeeder
    ```

8. Execute create simlink storage
    ```
    php artisan storage:link
    ```

9.  Run php artisan
    ```
    php artisan serve
    ```

10. Run npm  
    if use NPM,
    ```
    npm run dev
    ```

    if use Yarn,
    ```
    yarn dev
    ```


### Use Xampp

> WARNING!  
> 1. For xampp, every value "localhost" in file .env must changed to domain.
> Application will not be started if use localhost.
> 2. Make sure database already exist and empty.

1. Clone this repository to your local.
2. Open folder application after finish clone repository to local.
3. Setup file `.env` (copy `.env.example` to `.env`)
4. Change and Adjust values in file `.env`.
   1. `APP_URL`, your domain of application (_don't use localhost_). 
   2. `DB_HOST`, endpoint of mysql/mariadb service .
   3. `DB_PORT`, port number of mysql/mariadb.
   4. `DB_DATABASE`, name of database on mysql/mariadb.
   5. `DB_USERNAME`, authenticated username for mysql/mariadb.
   6. `DB_PASSWORD`, authenticated password for mysql/mariadb.
   7. `SANCTUM_STATEFUL_DOMAINS`, your domain of application (_don't use localhost and don't include http:// or https://_).
   8. `SESSION_DOMAIN`, your domain of application (_don't use localhost and don't include http:// or https://_).
5. Build interface  
    if use NPM,
    ``` 
    npm run build
    ```

    if use Yarn,
    ``` 
    yarn build
    ```

6. Execute database migration
    ```
    php artisan migrate
    ```

7. Execute database seeder
    ```
    php artisan db:seed --class=ClientSeeder
    php artisan db:seed --class=ProjectSeeder
    ```

8. Execute create simlink storage
    ```
    php artisan storage:link
    ```
    
9. Setup xampp httpd vhosts
   1. Create folder in directory `htdocs` in your xampp path directory.
   2. Copy source code to new directory(_step 6.1_)
   3. Open file `/apache/conf/extra/httpd-vhosts.conf` in directory of your xampp.
   4. Add this config to file `httpd-vhosts.conf` (_make sure **domain** same as **SESSION_DOMAIN** in file `.env`. And in application make sure directory exists for value of  `DocumentRoot`, and don't forget to add path `public` for value of `DocumentRoot`_).
    ```
    <VirtualHost *:80>
        ServerAdmin webmaster@{YOUR-DOMAIN}
        DocumentRoot "D:/xampp/htdocs/{YOUR-PROJECT-DIR}/public"
        ServerName {YOUR-DOMAIN}
        ServerAlias www.{YOUR-DOMAIN}
        ErrorLog "logs/{YOUR-DOMAIN}-error.log"
        CustomLog "logs/{YOUR-DOMAIN}-access.log" common
    </VirtualHost>
    ```

   5. Start your xampp (_make sure xampp running well_).
   6. Edit file `C:\Windows\system32\drivers\etc\hosts`, and add your domain to the file. example,
    ```
    127.0.0.1 {YOUR-PROJECT-DIR}
    ```

10. The last open application on your browser.


