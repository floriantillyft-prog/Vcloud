# Vcloud – site statique

Trois interfaces enchaînées :
1. **Accueil** (fond étoilé animé, CTA “Accéder à Vcloud”)
2. **Fonctionnalités** (fond “smooth” animé, bouton “Consulter les abonnements”, bouton “Se connecter” à droite, menu burger avec tiroir à gauche)
3. **Abonnements** (slide horizontal, cartes avec hover)

## Déploiement via GitHub Pages (Actions)

- `Settings → Pages` : **Source = GitHub Actions**
- Le workflow `.github/workflows/deploy.yml` se déclenche à chaque push sur `main` (ou manuellement).
