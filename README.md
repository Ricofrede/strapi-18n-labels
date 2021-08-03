# Strapi Plugin i18n-labels

The goal for this plugin for Strapi.io is to be able to store static labels (e.g. "Read More", "Click Here", ...) in multiple languages, directly in the backend with a similar API to the existing one and that communicates with the i18n plugin that ships with the standard Strapi installation.

## Installation

You may install this plugin by running the following in your Strapi project's root folder:

```
npm i strapi-plugin-i18n-labels
```

And then upgrade your admin UI panel by running:

```
npm run build
```

## Dependencies

For this plugin you'll need to have the standard "i18n-plugin" installed and also the "Roles & Permissions" plugin.

## Usage

To avoid problems with authentication, the plugin by default expects an authenticated user to make the requests to it so you need to create a user for this use case.

Also, you need to give the following permissions to Authenticated users:

 - Access to the "listlocales" handler from the "i18n" plugin;
 - Access to the "read" and "write" handlers from this plugin ("i18n-labels").

 Once that's done you may send authenticated "GET" requests to the "/i18n-labels" URL to list the current existing labels or authenticated "POST" requests to the "/i18n-labels/write" URL to add a new label.

 Alternatively you may use the graphical UI in the admin panel that does the authentication followed by the inclusion of the new label. The UI is a better option in this case because it already gives the amount of languages available to add based on your "i18n" plugin settings, so it also matches the languages your content itself is written in.

 ## Storage

 These labels are very simple, they are going to be stored in your root folder in a file called "labels.json", that has the following structure:

 ```
{
    "test": {
        "en": "test",
        "pt-BR": "teste"
    },
    "click-here": {
        "en": "Click Here",
        "pt-BR": "Clique Aqui"
    }
}
```

So remember to add this file in your ".gitignore" list.