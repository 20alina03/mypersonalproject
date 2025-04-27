
import { motion } from "framer-motion";
import { TravelTip } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyTipProps {
  tip: TravelTip;
}

const DailyTip = ({ tip }: DailyTipProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-atlas-teal/10 to-atlas-navy/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-atlas-teal">Daily Travel Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">{tip.title}</h3>
          <p className="text-muted-foreground mb-4">{tip.content}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">#{tip.category}</span>
            <Button variant="ghost" size="sm" className="text-atlas-orange">
              <Heart className="h-4 w-4 mr-1" />
              {tip.likes}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailyTip;
