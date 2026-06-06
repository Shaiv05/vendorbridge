"use client";

import { useEffect, useState, use } from "react";
import { BarChart3, ArrowLeft, Trophy, Clock, DollarSign, Loader2, Star, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { quotationService } from "@/services/quotation-service";
import { rfqService } from "@/services/rfq-service";
import type { Quotation } from "@/types/quotation";
import type { RFQ } from "@/types/rfq";
import { Button, Card } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export default function ComparePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [quotes, setQuotes] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rfqRes, quotesRes] = await Promise.all([
          rfqService.getById(parseInt(id)),
          quotationService.getComparison(parseInt(id))
        ]);
        setRfq(rfqRes.data);
        setQuotes(quotesRes.data);
      } catch (e) {
        toast.error("Failed to load comparison data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Analyzing quotations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Comparison Engine</h1>
          <p className="text-muted-foreground text-sm">Evaluating {quotes.length} submissions for: <span className="text-foreground font-semibold">{rfq?.title}</span></p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <Card className="p-6 bg-primary/5 border-primary/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-white grid place-items-center shadow-glow"><DollarSign className="h-5 w-5" /></div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-primary">Best Price</div>
              <div className="text-xl font-bold">${quotes.length > 0 ? parseFloat(quotes[0].price).toLocaleString() : "0"}</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-violet/5 border-violet/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet text-white grid place-items-center shadow-glow"><Clock className="h-5 w-5" /></div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-violet">Avg. Delivery</div>
              <div className="text-xl font-bold">
                {quotes.length > 0 ? Math.round(quotes.reduce((acc, q) => acc + q.delivery_days, 0) / quotes.length) : 0} Days
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-success/5 border-success/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-success text-white grid place-items-center shadow-glow"><Trophy className="h-5 w-5" /></div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-success">Decision Support</div>
              <div className="text-xl font-bold">Live Ranking</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden border-white/20 bg-white/40 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Rank</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Vendor Name</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Price (Unit)</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Delivery</th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Score</th>
                <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {quotes.map((q, i) => (
                <motion.tr initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  key={q.id} className={cn("group hover:bg-white/60 transition-colors", i === 0 && "bg-primary/5")}>
                  <td className="px-6 py-6">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm",
                      i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-slate-300 text-slate-700" : i === 2 ? "bg-orange-300 text-white" : "bg-muted text-muted-foreground")}>
                      {i + 1}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="font-bold text-sm flex items-center gap-2">
                      {q.vendor_name}
                      {i === 0 && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 max-w-[200px] line-clamp-1 italic">"{q.notes}"</div>
                  </td>
                  <td className="px-6 py-6">
                    <div className={cn("text-base font-black tracking-tight", q.is_lowest_price ? "text-success" : "text-foreground")}>
                      ${parseFloat(q.price).toLocaleString()}
                    </div>
                    {q.is_lowest_price && <div className="text-[9px] font-bold text-success uppercase tracking-tighter">Lowest Bid</div>}
                  </td>
                  <td className="px-6 py-6">
                    <div className={cn("text-sm font-semibold", q.is_fastest_delivery ? "text-violet" : "text-muted-foreground")}>
                      {q.delivery_days} Days
                    </div>
                    {q.is_fastest_delivery && <div className="text-[9px] font-bold text-violet uppercase tracking-tighter">Fastest</div>}
                  </td>
                  <td className="px-6 py-6">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${100 - (i * 15)}%` }} />
                    </div>
                    <div className="text-[10px] font-bold mt-1 text-muted-foreground uppercase">{100 - (i * 15)}% Match</div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <Button variant={i === 0 ? "gradient" : "outline"} size="sm" className="h-8 shadow-sm">
                      {i === 0 ? "Accept Quote" : "Shortlist"}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="p-6 border-success/20 bg-success/5">
          <h3 className="font-bold text-success flex items-center gap-2 mb-2"><CheckCircle2 className="h-4 w-4" /> Recommendation</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Based on the automated ranking system, <span className="font-bold text-foreground">{quotes[0]?.vendor_name}</span> offers the best combination of pricing and delivery efficiency. Their bid is {Math.round((1 - (parseFloat(quotes[0]?.price || "1") / parseFloat(quotes[1]?.price || "1"))) * 100)}% lower than the nearest competitor.
          </p>
        </Card>
      </div>
    </div>
  );
}
