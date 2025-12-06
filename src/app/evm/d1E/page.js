import VotingInterface from "./VotingInterface";

export const metadata = {
  title: "Vote for EVM",
  description: "Custom metadata for this EVM voting simulation page.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function CampaignPage() {
  return <VotingInterface />;
}