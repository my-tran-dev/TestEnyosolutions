# Test Enyosolutions

## Cloner cette respositorie
```
git clone https://github.com/my-tran-dev/TestEnyosolutions.git
```

## Installer les dépendencies
```
npm i 
```

## Mettre à jour les variables environnements dans .env.test et renommer à .env

## Créer les tables grâce au fichier "script.sql"

## Démarrer le projet par la commande
```
npm start
```

## Pour importer les articles, envoyez une requête POST 
```
localhost:3000/api/articles/import?siteRssUrl=https://www.theguardian.com/world/europe-news/rss
```
OR
```
localhost:3000/api/articles/import?siteRssUrl=https://www.lemonde.fr/rss/une.xml
```

## Pour afficher les articles exitant dans la base de données, envoyez une requête GET
```
http://localhost:3000/api/articles
```

## Images de demo

|![Importer les articles via rss-url](https://raw.githubusercontent.com/my-tran-dev/TestEnyosolutions/master/public/readmeimg/1.png)|
|:--:|
|*Exemple importer les articles via rss-url (phpMyAdmin)*|

|![Afficher les articles](https://raw.githubusercontent.com/my-tran-dev/TestEnyosolutions/master/public/readmeimg/2.png)|
|:--:|
|*Exemple afficher les articles (Postman)*|
