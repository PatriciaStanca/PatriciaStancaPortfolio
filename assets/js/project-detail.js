const pexels = {
  game: {
    image: "assets/media/projects/pexels/gaming-controller.jpg",
    alt: "A hand holding a game controller in neon light",
    source: "https://www.pexels.com/photo/a-game-controller-on-a-hand-14189711/",
  },
  crypto: {
    image: "assets/media/projects/pexels/crypto-dashboard.jpg",
    alt: "Cryptocurrency charts displayed on a laptop",
    source: "https://www.pexels.com/photo/cryptocurrency-chart-displayed-on-a-laptop-14751274/",
  },
  python: {
    image: "assets/media/projects/pexels/python-programming.jpg",
    alt: "A developer programming on a laptop",
    source: "https://www.pexels.com/photo/woman-programming-on-a-notebook-1181359/",
  },
  cards: {
    image: "assets/media/projects/pexels/playing-cards.jpg",
    alt: "Playing cards scattered on a dark surface",
    source: "https://www.pexels.com/photo/playing-cards-5477760/",
  },
};

const projects = {
  "freaky-fashion": {
    title: "Freaky Fashion",
    type: "Full stack ecommerce",
    summary: "A responsive React storefront backed by an ASP.NET Core API for products, categories and shopping carts.",
    detail: "The storefront includes product search, category filtering, product details and a working cart. The backend adds Entity Framework Core, JWT-protected management endpoints, validation, tests, Docker and Azure deployment configuration.",
    tools: ["React", "TypeScript", "ASP.NET Core 8", "EF Core", "SQLite", "JWT", "Docker"],
    image: "assets/media/projects/freaky-fashion-poster.jpg",
    alt: "Freaky Fashion storefront",
    github: "https://github.com/PatriciaStanca/FreakyFashion-Fullstack",
    live: "/freakyfashion",
  },
  "stanca-bank-api": {
    title: "Stanca Bank API",
    type: "Secure Web API",
    summary: "A banking backend with separate customer and administrator roles, protected by JWT authentication.",
    detail: "The API handles customers, accounts, loans and transactions. Role-based authorization separates administrative operations from customer flows, while the service and repository layers keep domain logic away from the controllers.",
    tools: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "JWT", "Swagger"],
    image: "assets/media/images/BANKAPI-1200.webp",
    alt: "Stanca Bank API project presentation",
    github: "https://github.com/PatriciaStanca/StancaBankApi",
  },
  "stanca-blog-api": {
    title: "Stanca Blog API",
    type: "Community Web API",
    summary: "An authenticated blog API for accounts, posts, categories and conversations through comments.",
    detail: "Public users can browse and search posts while authenticated users can publish and comment. Ownership checks protect updates and deletion, and the code is organised into controllers, services, repositories, DTOs and infrastructure.",
    tools: ["C#", ".NET 8", "ASP.NET Core", "EF Core", "SQL Server", "JWT", "OpenAPI"],
    image: "assets/media/images/StancaBlogApi-1200.webp",
    alt: "Stanca Blog API project presentation",
    github: "https://github.com/PatriciaStanca/StancaBlogApi",
  },
  "northwind-app": {
    title: "Northwind App",
    type: "Data application",
    summary: "A Razor Pages application that turns the Northwind product database into a clear browser interface.",
    detail: "The application lists products in a responsive table and provides an individual detail view. Entity Framework Core connects the Razor Pages interface to a SQL Server version of the classic Northwind relational dataset.",
    tools: ["C#", ".NET 9", "Razor Pages", "EF Core", "SQL Server", "Bootstrap"],
    image: "assets/media/images/NorthwindApp (kopia).jpg",
    alt: "Northwind application project",
    github: "https://github.com/PatriciaStanca/NorthwindApp",
  },
  "shotgun-game": {
    title: "Shotgun Game",
    type: "Blazor WebAssembly game",
    summary: "A turn-based browser duel where ammunition, timing and defensive choices determine each round.",
    detail: "The player and CPU choose between reload, block, shoot and shotgun actions. The project demonstrates component state, conditional game logic, static asset handling and a clean separation between the interface and gameplay rules.",
    tools: ["C#", ".NET", "Blazor WebAssembly", "CSS", "Game state"],
    ...pexels.game,
    github: "https://github.com/PatriciaStanca/ShotgunGame",
  },
  "address-book": {
    title: "AddressBook Avalonia",
    type: "Desktop application",
    summary: "A cross-platform C# address book created with Avalonia for managing structured contact information.",
    detail: "The project explores desktop user interfaces, forms and application state in a cross-platform .NET environment. Its live page presents the work without pretending that a desktop executable runs inside the browser.",
    tools: ["C#", ".NET", "Avalonia UI", "Desktop UI", "Data modelling"],
    ...pexels.python,
    github: "https://github.com/PatriciaStanca/AddressBookAvalonia",
  },
  "address-book-group": {
    title: "AddressBook Group",
    type: "Collaborative desktop project",
    summary: "A group-built Avalonia address book focused on shared structure, coordination and C# desktop development.",
    detail: "This version represents collaborative project work: agreeing on application structure, combining contributions and building a consistent contact-management experience with Avalonia and .NET.",
    tools: ["C#", ".NET", "Avalonia UI", "Git", "Team collaboration"],
    ...pexels.python,
    github: "https://github.com/PatriciaStanca/AddressBookAvaloniaGroup",
  },
  blackjack: {
    title: "Blackjack",
    type: "Python and Flask game",
    summary: "A browser-based Blackjack game with session handling, card draws and computer-controlled play.",
    detail: "Players can hit or stand while the Flask application manages the game session and renders results through Jinja templates. It was built to practise Python control flow, functions, web routing and server-rendered interaction.",
    tools: ["Python", "Flask", "Jinja", "HTML", "CSS", "Sessions"],
    ...pexels.cards,
    github: "https://github.com/PatriciaStanca/blackjack.py",
  },
  "crypto-portfolio": {
    title: "Crypto Portfolio",
    type: "Python CLI and SQLite",
    summary: "A command-line portfolio manager for recording cryptocurrency transactions and calculating current value.",
    detail: "The tool stores investments in SQLite, uses parameterised queries, imports and exports CSV files and fetches current market prices from CoinGecko. Dataclasses provide a clear model for investment records.",
    tools: ["Python", "SQLite", "Click", "CoinGecko API", "CSV", "Dataclasses"],
    ...pexels.crypto,
    github: "https://github.com/PatriciaStanca/sqlite3",
  },
  "python-chat": {
    title: "Python Chat",
    type: "Python learning project",
    summary: "An early Python project created to explore communication flows and practical program structure.",
    detail: "The repository records an earlier stage of my Python learning. This project page keeps that progression visible while directing visitors to the original source for the exact implementation.",
    tools: ["Python", "Program structure", "Learning project"],
    ...pexels.python,
    github: "https://github.com/PatriciaStanca/python_chatt",
  },
  "python-projects": {
    title: "Python Projects",
    type: "Learning collection",
    summary: "A collection of early Python exercises that documents the foundations behind later application work.",
    detail: "These exercises focus on core programming concepts and show the development path from smaller scripts toward database-backed and web-based applications.",
    tools: ["Python", "Functions", "Control flow", "Learning exercises"],
    ...pexels.python,
    github: "https://github.com/PatriciaStanca/Projects_py",
  },
};

const params = new URLSearchParams(window.location.search);
const slug = params.get("project") || "freaky-fashion";
const project = projects[slug];

if (!project) {
  window.location.replace("/projects");
} else {
  document.title = `${project.title} | Patricia Stanca`;
  document.querySelector('meta[name="description"]').content = project.summary;
  document.getElementById("project-type").textContent = project.type;
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-summary").textContent = project.summary;
  document.getElementById("project-detail").textContent = project.detail;

  const image = document.getElementById("project-image");
  image.src = project.image;
  image.alt = project.alt;

  const credit = document.getElementById("project-credit");
  if (project.source) {
    credit.innerHTML = `Photo: <a href="${project.source}">Pexels</a>`;
  } else {
    credit.remove();
  }

  const actions = document.getElementById("project-actions");
  if (project.live) {
    const live = document.createElement("a");
    live.href = project.live;
    live.textContent = "Open live project ↗";
    actions.append(live);
  }

  const code = document.createElement("a");
  code.href = project.github;
  code.textContent = "View code on GitHub ↗";
  actions.append(code);

  const tools = document.getElementById("project-tools");
  project.tools.forEach((tool) => {
    const item = document.createElement("li");
    item.textContent = tool;
    tools.append(item);
  });
}
