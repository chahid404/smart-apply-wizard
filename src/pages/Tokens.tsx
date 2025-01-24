import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, DollarSign, Plus, ShoppingCart } from "lucide-react";

const TokenPackages = [
  { tokens: 100, price: 10, popular: false },
  { tokens: 500, price: 45, popular: true },
  { tokens: 1000, price: 80, popular: false },
];

export default function Tokens() {
  const { toast } = useToast();

  const handlePurchase = (tokens: number, price: number) => {
    console.log(`Purchasing ${tokens} tokens for $${price}`);
    toast({
      title: "Purchase initiated",
      description: `Processing purchase of ${tokens} tokens for $${price}`,
    });
  };

  return (
    <div className="container max-w-6xl py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-navy">Tokens</h1>
        <p className="text-gray-600">Purchase tokens to use our AI services</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-teal" />
            <h2 className="text-xl font-semibold">Current Balance</h2>
          </div>
          <div className="text-2xl font-bold text-navy">1000 Tokens</div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Custom Amount
          </Button>
          <Button variant="outline" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Manage Payment Methods
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TokenPackages.map((pkg) => (
          <Card
            key={pkg.tokens}
            className={`p-6 relative ${
              pkg.popular ? "border-2 border-teal" : ""
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-teal text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-semibold">{pkg.tokens} Tokens</h3>
                <p className="text-3xl font-bold text-navy">${pkg.price}</p>
                <p className="text-gray-600 text-sm">
                  ${(pkg.price / pkg.tokens).toFixed(2)} per token
                </p>
              </div>
              <Button
                className="w-full gap-2"
                onClick={() => handlePurchase(pkg.tokens, pkg.price)}
              >
                <ShoppingCart className="h-4 w-4" />
                Purchase
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}