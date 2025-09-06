# Vcloud (GitHub Pages prêt)

Ce dépôt est prêt à être poussé tel quel sur GitHub pour déployer **automatiquement** sur **GitHub Pages**.

## Déploiement
1. Crée un nouveau dépôt vide sur ton GitHub (ex: `vcloud`).  
2. Pousse ces fichiers :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<ton-user>/<ton-repo>.git
   git push -u origin main
   ```
3. Va sur l'onglet **Actions** : le workflow **Pages** va construire et publier le site (branche `gh-pages`).  
4. Dans **Settings → Pages**, l’URL s’affiche (ex: `https://<ton-user>.github.io/<ton-repo>/`).

### Domaine personnalisé (optionnel)
- Modifie le fichier `CNAME` et mets **ton** domaine (ex: `cloud.mondomaine.com`).  
- Ajoute un CNAME DNS pointant vers `<ton-user>.github.io`.

Bon déploiement !
