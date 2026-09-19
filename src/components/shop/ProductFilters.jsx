import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function ProductFilters({ filters, setFilters, products }) {
  const [isOpen, setIsOpen] = React.useState(true);

  const maxPrice = Math.max(...products.map(p => p.price || 0), 1000);
  
  const toggleBrand = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handlePriceChange = (values) => {
    setFilters(prev => ({
      ...prev,
      priceRange: values
    }));
  };

  const handleAvailabilityChange = (value) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability === value ? 'all' : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, maxPrice],
      availability: 'all'
    });
  };

  const hasActiveFilters = filters.brands.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < maxPrice ||
    filters.availability !== 'all';

  return (
    <Card className="glass-card border-[#00ffc6]/20 sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <Filter className="w-5 h-5 text-[#00ffc6]" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-[#00ffc6] hover:text-[#00d9a8]"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brand Filter */}
        <div>
          <h4 className="font-bold mb-3 text-white">Brand</h4>
          <div className="space-y-2">
            {['Tangem', 'OneKey', 'Keystone', 'Ledger'].map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <Checkbox
                  id={`brand-${brand.toLowerCase()}`}
                  checked={filters.brands.includes(brand.toLowerCase())}
                  onCheckedChange={() => toggleBrand(brand.toLowerCase())}
                  className="border-[#00ffc6] data-[state=checked]:bg-[#00ffc6] data-[state=checked]:text-[#071018]"
                />
                <Label
                  htmlFor={`brand-${brand.toLowerCase()}`}
                  className="text-[#c6fff0] cursor-pointer"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-bold mb-3 text-white">
            Price Range: RM {filters.priceRange[0]} - RM {filters.priceRange[1]}
          </h4>
          <Slider
            min={0}
            max={maxPrice}
            step={10}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="[&_[role=slider]]:bg-[#00ffc6] [&_[role=slider]]:border-[#00ffc6]"
          />
        </div>

        {/* Availability Filter */}
        <div>
          <h4 className="font-bold mb-3 text-white">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="in-stock"
                checked={filters.availability === 'in-stock'}
                onCheckedChange={() => handleAvailabilityChange('in-stock')}
                className="border-[#00ffc6] data-[state=checked]:bg-[#00ffc6] data-[state=checked]:text-[#071018]"
              />
              <Label htmlFor="in-stock" className="text-[#c6fff0] cursor-pointer">
                In Stock Only
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="out-of-stock"
                checked={filters.availability === 'out-of-stock'}
                onCheckedChange={() => handleAvailabilityChange('out-of-stock')}
                className="border-[#00ffc6] data-[state=checked]:bg-[#00ffc6] data-[state=checked]:text-[#071018]"
              />
              <Label htmlFor="out-of-stock" className="text-[#c6fff0] cursor-pointer">
                Show Out of Stock
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}