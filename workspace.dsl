workspace "PatriciaStancaPortfolio" "Static portfolio website project with multiple pages and shared assets." {

    !identifiers hierarchical

    model {
        viewer = person "Visitor" "Browses the portfolio and contact information."
        dev = person "Developer" "Builds and maintains the site locally."

        portfolio = softwareSystem "PatriciaStancaPortfolio" "Static portfolio site deployed as a static website." {
            html = container "HTML Pages" "Static pages: index.html, generic.html, elements.html, contact.html, cv.html, privacy.html." "HTML"
            css = container "CSS Stylesheets" "base.css, layout.css, utilities.css, components/*." "CSS"
            js = container "JavaScript" "main.js + validators.js (contact only)." "JavaScript"
            assets = container "Static Assets" "Images, PDFs, videos, icons." "Static files"
        }

        repo = softwareSystem "GitHub Repository" "Source code hosting and version control." "External"
        ci = softwareSystem "CI Pipeline" "Automated lint/tests/Lighthouse." "External"
        netlify = softwareSystem "Netlify" "Builds and hosts the static site." "External"
        dns = softwareSystem "Custom Domain / DNS" "Domain configuration and DNS records." "External"

        weatherApi = softwareSystem "Open-Meteo API" "Public weather API used to display current weather." "External"
        formspree = softwareSystem "Formspree" "Handles contact form submissions." "External"
        inbox = softwareSystem "Email Inbox" "Receives contact form messages." "External"

        viewer -> portfolio.html "Visits and navigates"
        portfolio.html -> portfolio.css "Loads styles"
        portfolio.html -> portfolio.js "Loads scripts"
        portfolio.html -> portfolio.assets "Loads media"

        portfolio.html -> weatherApi "Fetches weather data (contact)"
        portfolio.html -> formspree "Submits contact form"
        formspree -> inbox "Delivers form submissions"

        dev -> repo "Pushes changes"
        repo -> ci "Triggers checks"
        repo -> netlify "Triggers build & deploy"
        netlify -> portfolio.html "Serves site"
        netlify -> portfolio.css "Serves CSS"
        netlify -> portfolio.js "Serves JS"
        netlify -> portfolio.assets "Serves assets"
        dns -> netlify "Points domain to hosting"
    }

    views {
        systemContext portfolio "SystemContext" {
            include *
        }

        container portfolio "ContainerView" {
            include *
        }

        styles {
            element "Element" {
                color #0773af
                stroke #0773af
                strokeWidth 7
                shape roundedbox
            }
            element "Person" {
                shape person
            }
            relationship "Relationship" {
                thickness 4
            }
        }
    }

    configuration {
        scope softwaresystem
    }
}
