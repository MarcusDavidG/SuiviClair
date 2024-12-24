# SuiviClair - Supply Chain Management Frontend

SuiviClair ("Clear Tracking" in French) is a modern supply chain management application focused on providing clear, transparent tracking of shipments.

## Current State

### Frontend Implementation
- React + TypeScript + Vite application
- TailwindCSS for styling
- Responsive design with dark mode support
- Map integration with Leaflet for shipment tracking

### Core Features
- Shipment Creation Form
  - Product details
  - Sender/Receiver information
  - Package specifications
  - Special handling instructions

- Dashboard
  - Shipment statistics overview
  - Recent shipments list
  - Quick access to create new shipments

- Shipment Tracking
  - Real-time map visualization
  - Shipment status updates
  - Origin and destination markers

### Project Structure
```
frontend/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files
│   ├── pages/          # Main application pages
│   ├── providers/      # Context providers
│   └── styles/         # Global styles and CSS
```

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/MarcusDavidG/SuiviClair.git
cd SuiviClair
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port).

## Features

### Shipment Creation
- Comprehensive form for new shipments
- Input validation
- Support for special handling instructions
- Real-time feedback

### Dashboard
- Overview of all shipments
- Statistics and metrics
- Quick actions for common tasks
- Status filtering

### Shipment Tracking
- Interactive map interface
- Real-time status updates
- Detailed shipment information
- Route visualization

## Development

### Tech Stack
- React 18
- TypeScript

### Zero-Knowledge Layer (Cairo SDK)
- ZK-proofs generation
- Private computation
- Secure state transitions
- Verification logic

## 🔐 Privacy Considerations

- All sensitive data is encrypted using Calimero SDK
- Zero-knowledge proofs ensure verifiability without data exposure
- Granular access control for different stakeholders
- Secure key management and rotation

## 🧪 Testing

```bash
# Run Cairo tests
cairo-test ./tests

# Run frontend tests
npm test
```

## 📈 Future Enhancements

- Advanced ZK-proof schemes for complex supply chain operations
- Enhanced privacy-preserving analytics
- Multi-party computation features
- Cross-chain private bridges

## 👥 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/privacy-enhancement`
3. Commit changes: `git commit -am 'Add privacy feature'`
4. Push branch: `git push origin feature/privacy-enhancement`
5. Submit pull request

## 🔒 Security

- Regular security audits
- Privacy-focused code reviews
- Encrypted communication channels
- Secure key management

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 📞 Contact

- GitHub: [@MarcusDavidG](https://github.com/MarcusDavidG)
- Project: [https://github.com/MarcusDavidG/SuiviClair](https://github.com/MarcusDavidG/SuiviClair)
