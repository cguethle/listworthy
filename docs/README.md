# Documentation

This directory contains comprehensive documentation for the Personal Task Tracker application.

## Documentation Structure

### Core Documentation
- **[index.md](index.md)** - Project overview and quick start guide
- **[user-guide.md](user-guide.md)** - Complete user manual with features and usage instructions
- **[architecture.md](architecture.md)** - Technical architecture and design decisions
- **[api-reference.md](api-reference.md)** - Component and API documentation
- **[development.md](development.md)** - Development setup and contribution guide
- **[technical-specs.md](technical-specs.md)** - Detailed technical specifications

### MkDocs Configuration
- **[mkdocs.yml](mkdocs.yml)** - MkDocs site configuration

## Building Documentation Site

### Prerequisites
```bash
pip install mkdocs-material
pip install mkdocs-git-revision-date-localized-plugin
pip install mkdocs-minify-plugin
```

### Local Development
```bash
# Serve documentation locally
mkdocs serve

# Build static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

The documentation will be available at `http://localhost:8000` during development.

## Documentation Features

### Theme and Styling
- Material Design theme with dark/light mode toggle
- Responsive design for mobile devices
- Syntax highlighting for code blocks
- Search functionality
- Navigation tabs and sections

### Content Features
- Mermaid diagrams for flowcharts
- Code copy buttons
- Table of contents integration
- Git revision dates
- Social media links

### Extensions
- Admonition blocks for notes and warnings
- Task lists with custom checkboxes
- Emoji support
- Mathematical expressions
- Tabbed content blocks

## Contributing to Documentation

### Style Guide
- Use clear, concise language
- Include code examples where appropriate
- Use consistent formatting and structure
- Add screenshots for UI features
- Keep documentation up to date with code changes

### File Organization
- One main topic per file
- Use descriptive filenames
- Include internal links between related topics
- Maintain logical information hierarchy

### Content Guidelines
- Start each document with a clear overview
- Use headings to structure content
- Include practical examples
- Provide troubleshooting information
- Link to external resources when helpful

## Deployment

### GitHub Pages
The documentation can be automatically deployed to GitHub Pages using:
```bash
mkdocs gh-deploy
```

### Custom Domain
To use a custom domain:
1. Add `CNAME` file to the `docs/` directory
2. Configure DNS settings
3. Update `site_url` in `mkdocs.yml`

### CI/CD Integration
Add GitHub Actions workflow for automatic deployment:
```yaml
name: Deploy Documentation
on:
  push:
    branches: [ main ]
    paths: [ 'docs/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.x
      - run: pip install mkdocs-material
      - run: mkdocs gh-deploy --force
```

## Maintenance

### Regular Updates
- Review and update documentation with each release
- Check for broken links
- Update screenshots and examples
- Refresh technical specifications
- Add new features and changes

### Quality Assurance
- Spell check all content
- Verify code examples work
- Test documentation site build
- Check responsive design
- Validate all links and references