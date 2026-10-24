from pathlib import Path

content = """# Discover Japan

A cinematic Japan tourism landing page designed to showcase destinations, seasonal experiences, and travel packages through an editorial-inspired visual experience.

## Live Website

**[Visit Discover Japan](https://discover-japan.higgsfield.app)**

## Overview

Discover Japan is a tourism landing page concept built to help visitors explore Japan's regions, discover experiences for different seasons, and learn about travel packages.

## Highlights

- Cinematic, editorial-inspired Japan travel presentation
- Destination and regional highlights
- Seasonal experience discovery
- Travel package showcase
- Enquiry form UI
- Responsive landing-page layout and visual animations

## Project Status

The website is deployed on Higgsfield. The enquiry form is currently a demo interface; submissions are not connected to a production email or database unless separately configured.


## Disclaimer

This project is a tourism landing-page concept. Destination details, package information, and enquiry functionality should be verified and configured before using the site for real bookings.
"""
path = Path("/mnt/data/README.md")
path.write_text(content, encoding="utf-8")
print(f"Created: {path}")
