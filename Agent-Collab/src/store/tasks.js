import { atom } from "nanostores";

export const $tasks = atom([
  {
    "id": 1,
    "title": "Créer une API Rest avec 5 endpoints",
    "description": "Créer une API Rest avec 5 endpoints et Node.js conforme aux bonnes pratiques.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 10,
    "realizedTime": 9,
    "dueDate": "2024-06-01",
    "completed": true,
    "commentary": "Je suis satisfait du résultat, les endpoints fonctionnent parfaitement, ça motive !",
    "humor": ""
  },
  {
    "id": 2,
    "title": "Réaliser l’intégration continue",
    "description": "Mettre en place un pipeline CI/CD avec GitHub Actions.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 8,
    "realizedTime": 7,
    "dueDate": "2024-06-02",
    "completed": true,
    "commentary": "Un peu complexe à configurer, mais la réussite finale est très gratifiante.",
    "humor": ""
  },
  {
    "id": 3,
    "title": "Écrire les tests unitaires",
    "description": "Créer des tests unitaires pour les modules clés.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 6,
    "realizedTime": null,
    "dueDate": "2024-06-03",
    "completed": false,
    "commentary": "Frustrant de devoir reporter, mais je sais que c’est indispensable.",
    "humor": ""
  },
  {
    "id": 4,
    "title": "Rédiger les spécifications fonctionnelles",
    "description": "Documenter les besoins fonctionnels pour la prochaine version.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 7,
    "realizedTime": 6,
    "dueDate": "2024-06-04",
    "completed": true,
    "commentary": "Un vrai plaisir d’avoir réussi à clarifier toutes les attentes.",
    "humor": ""
  },
  {
    "id": 5,
    "title": "Optimiser les requêtes SQL",
    "description": "Améliorer les performances des requêtes pour le module rapport.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 5,
    "realizedTime": null,
    "dueDate": "2024-06-05",
    "completed": false,
    "commentary": "C’est un vrai défi, je sens la pression monter sur cette tâche.",
    "humor": ""
  },
  {
    "id": 6,
    "title": "Tester l’interface utilisateur",
    "description": "Effectuer des tests manuels sur l’UI avec scénarios définis.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 4,
    "realizedTime": 4,
    "dueDate": "2024-06-06",
    "completed": true,
    "commentary": "Encourageant de voir que les retours sont positifs, ça motive l’équipe.",
    "humor": ""
  },
  {
    "id": 7,
    "title": "Mettre à jour la base de données",
    "description": "Appliquer les migrations pour la nouvelle structure.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 3,
    "realizedTime": 2,
    "dueDate": "2024-06-07",
    "completed": true,
    "commentary": "Tout s’est bien passé, je ressens un vrai soulagement.",
    "humor": ""
  },
  {
    "id": 8,
    "title": "Configurer la sécurité API",
    "description": "Ajouter authentification JWT et gestion des rôles.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 6,
    "realizedTime": null,
    "dueDate": "2024-06-08",
    "completed": false,
    "commentary": "Je me sens un peu débordé, cette tâche est complexe mais cruciale.",
    "humor": ""
  },
  {
    "id": 9,
    "title": "Développer la fonctionnalité recherche",
    "description": "Implémenter la recherche avancée dans l’application.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 7,
    "realizedTime": 6,
    "dueDate": "2024-06-09",
    "completed": true,
    "commentary": "Content du résultat, cette fonctionnalité fonctionne bien et aide vraiment.",
    "humor": ""
  },
  {
    "id": 10,
    "title": "Analyser les retours clients",
    "description": "Synthétiser les feedbacks pour la roadmap produit.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 5,
    "realizedTime": null,
    "dueDate": "2024-06-10",
    "completed": false,
    "commentary": "Un peu frustrée par la quantité d’informations à traiter.",
    "humor": ""
  },
  {
    "id": 11,
    "title": "Corriger les bugs critiques",
    "description": "Résoudre les bugs bloquants remontés en production.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 8,
    "realizedTime": 7,
    "dueDate": "2024-06-11",
    "completed": true,
    "commentary": "Stressant mais tellement satisfaisant une fois terminé.",
    "humor": ""
  },
  {
    "id": 12,
    "title": "Mettre à jour la documentation technique",
    "description": "Ajouter les nouveaux modules au wiki interne.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 4,
    "realizedTime": 3,
    "dueDate": "2024-06-12",
    "completed": true,
    "commentary": "La rédaction est plus agréable que prévu, ça facilite le travail de tous.",
    "humor": ""
  },
  {
    "id": 13,
    "title": "Préparer la démo client",
    "description": "Assembler la version démo et créer un script de présentation.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 6,
    "realizedTime": 5,
    "dueDate": "2024-06-13",
    "completed": true,
    "commentary": "Excitée de montrer le travail accompli, impatiente du retour client.",
    "humor": ""
  },
  {
    "id": 14,
    "title": "Optimiser le chargement des pages",
    "description": "Réduire le temps de chargement via lazy loading.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 5,
    "realizedTime": 4,
    "dueDate": "2024-06-14",
    "completed": true,
    "commentary": "Les performances sont bien meilleures, je suis fier du résultat.",
    "humor": ""
  },
  {
    "id": 15,
    "title": "Revoir la structure CSS",
    "description": "Améliorer la maintenabilité du code CSS.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 4,
    "realizedTime": null,
    "dueDate": "2024-06-15",
    "completed": false,
    "commentary": "Un peu découragée par la complexité, mais il faut avancer.",
    "humor": ""
  },
  {
    "id": 16,
    "title": "Faire la revue de code",
    "description": "Analyser les pull requests et valider la qualité du code.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 3,
    "realizedTime": 3,
    "dueDate": "2024-06-16",
    "completed": true,
    "commentary": "Content de contribuer à la qualité globale du projet.",
    "humor": ""
  },
  {
    "id": 17,
    "title": "Préparer l’environnement de test",
    "description": "Mettre en place les bases pour les tests automatisés.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 6,
    "realizedTime": 5,
    "dueDate": "2024-06-17",
    "completed": true,
    "commentary": "Satisfait que les bases soient solides pour la suite.",
    "humor": ""
  },
  {
    "id": 18,
    "title": "Analyser les logs d’erreurs",
    "description": "Diagnostiquer les erreurs fréquentes en production.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 5,
    "realizedTime": null,
    "dueDate": "2024-06-18",
    "completed": false,
    "commentary": "Cette tâche est un peu fastidieuse, mais nécessaire.",
    "humor": ""
  },
  {
    "id": 18,
    "title": "Analyser les logs d’erreurs",
    "description": "Diagnostiquer les erreurs fréquentes en production.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 5,
    "realizedTime": null,
    "dueDate": "2024-06-18",
    "completed": false,
    "commentary": "Cette tâche est un peu fastidieuse, mais nécessaire.",
    "humor": ""
  },
  {
    "id": 19,
    "title": "Ajouter des fonctionnalités d’accessibilité",
    "description": "Améliorer l’accessibilité pour les utilisateurs en situation de handicap.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 7,
    "realizedTime": 6,
    "dueDate": "2024-06-19",
    "completed": true,
    "commentary": "Fière d’améliorer l’inclusivité du produit.",
    "humor": ""
  },
  {
    "id": 20,
    "title": "Réviser la politique de sécurité",
    "description": "Mettre à jour les règles pour la gestion des accès.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 4,
    "realizedTime": 4,
    "dueDate": "2024-06-20",
    "completed": true,
    "commentary": "Confiant que la sécurité est renforcée.",
    "humor": ""
  },
  {
    "id": 21,
    "title": "Tester la montée en charge",
    "description": "Simuler des charges importantes sur le serveur.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 8,
    "realizedTime": null,
    "dueDate": "2024-06-21",
    "completed": false,
    "commentary": "Inquiet des résultats, cette tâche est cruciale.",
    "humor": ""
  },
  {
    "id": 22,
    "title": "Réaliser une présentation technique",
    "description": "Exposer les choix techniques devant l’équipe.",
    "assignedTo": "Nicolas Salaun",
    "estimatedTime": 3,
    "realizedTime": 3,
    "dueDate": "2024-06-22",
    "completed": true,
    "commentary": "Content d’avoir partagé ma vision technique.",
    "humor": ""
  },
  {
    "id": 23,
    "title": "Mettre en place la gestion des erreurs",
    "description": "Ajouter un système de logs et alertes pour les erreurs.",
    "assignedTo": "Damien Kowalski",
    "estimatedTime": 5,
    "realizedTime": 4,
    "dueDate": "2024-06-23",
    "completed": true,
    "commentary": "Soulagé d’avoir mieux contrôlé les erreurs.",
    "humor": ""
  },
  {
    "id": 24,
    "title": "Documenter le protocole API",
    "description": "Rédiger une doc claire et accessible pour les API.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 4,
    "realizedTime": 4,
    "dueDate": "2024-06-24",
    "completed": true,
    "commentary": "Satisfaite d’avoir produit une documentation utile.",
    "humor": ""
  },
  {
    "id": 25,
    "title": "Finaliser les tests de recette",
    "description": "Valider les fonctionnalités en condition réelle.",
    "assignedTo": "Tiphaine Marais",
    "estimatedTime": 6,
    "realizedTime": null,
    "dueDate": "2024-06-25",
    "completed": false,
    "commentary": "Pressée que tout soit validé, mais c’est un travail exigeant.",
    "humor": ""
  }
]);

export const addTask = (task = {}) => {
  const tasks = $tasks.get();
  task.id = Math.random().toString();
  $tasks.set([task, ...tasks]);
};

export const removeTask = (id) => {
  const tasks = $tasks.get();
  $tasks.set(tasks.filter((t) => t.id !== id));
};

export const updateTask = (task = {}) => {
  const tasks = $tasks.get();
  const idx = tasks.findIndex((t) => t.id === task.id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], ...task };
    $tasks.set([...tasks]);
  }
};
