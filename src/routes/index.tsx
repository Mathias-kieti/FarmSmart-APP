import { Link } from "react-router-dom";
import { PageShell } from "@/components/agri/PageShell";
import { useUserStore } from "@/stores/userStore";
import { useLocationStore } from "@/stores/locationStore";
import { getRecommendations } from "@/data/recommendations";
import { getMarketPrices } from "@/data/marketPrices";
import { useListingsStore } from "@/stores/listingsStore";
import { CROPS } from "@/data/crops";
import tomatoesHero from "@/assets/crop-tomatoes.jpg";
import { TrendBadge } from "@/components/agri/TrendBadge";
import { ListingCard } from "@/components/agri/ListingCard";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CalendarDays,
  Cloud,
  CloudRain,
  Headphones,
  Lightbulb,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Sun,
  TrendingUp,
  Users,
} from "lucide-react";

const TILE_COLORS = {
  cream: "bg-tile-cream",
  sky: "bg-tile-sky",
  peach: "bg-tile-peach",
  lavender: "bg-tile-lavender",
} as const;

function QuickAction({
  to,
  label,
  sub,
  icon: Icon,
  color,
}: {
  to: string;
  label: string;
  sub: string;
  icon: any;
  color: keyof typeof TILE_COLORS;
}) {
  return (
    <Link
      to={to}
      className={`${TILE_COLORS[color]} rounded-2xl p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform`}
    >
      <Icon className="h-6 w-6 text-foreground/80" />
      <div>
        <p className="font-bold text-sm">{label}</p>
        <p className="text-[11px] text-foreground/70 mt-0.5">{sub}</p>
      </div>
      <ArrowRight className="h-4 w-4 self-end text-foreground/60" />
    </Link>
  );
}

export default function Dashboard() {
  const { user } = useUserStore();
  const county = useLocationStore((s) => s.county);
  const recs = getRecommendations(county);
  const top = recs[0];
  const alts = recs.slice(1, 4);
  const prices = getMarketPrices(county);
  const listings = useListingsStore((s) => s.listings).slice(0, 8);

  const heroImg =
    CROPS[top.cropId].hero ?? CROPS[top.cropId].image ?? tomatoesHero;

  return (
    <PageShell>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Hello, {user.name}! <span className="inline-block"></span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's what's happening on your farm today.
        </p>
      </div>

      {/* AI Recommendation Hero */}
      <section className="relative rounded-3xl overflow-hidden border border-border bg-card mb-6">
        <div className="grid md:grid-cols-2">
          <div className="p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-success font-semibold text-sm">
              <Sprout className="h-4 w-4" /> AI Recommendation for {county}
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Plant {CROPS[top.cropId].name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Best time to plant:{" "}
                {top.plantingWindow}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border p-3">
                <p className="text-[11px] text-muted-foreground">Est. Profit</p>
                <p className="font-bold text-success leading-tight mt-1">
                  KES {top.estProfitKes.toLocaleString()}
                  <span className="text-[10px] font-normal text-muted-foreground">
                    /acre
                  </span>
                </p>
              </div>
              <div className="rounded-xl border border-border p-3">
                <p className="text-[11px] text-muted-foreground">Demand</p>
                <p className="font-bold leading-tight mt-1 flex items-center gap-1">
                  {top.demand} <TrendingUp className="h-3 w-3 text-success" />
                </p>
              </div>
              <div className="rounded-xl border border-border p-3">
                <p className="text-[11px] text-muted-foreground">Risk</p>
                <p className="font-bold leading-tight mt-1 flex items-center gap-1">
                  {top.risk} <ShieldCheck className="h-3 w-3 text-success" />
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="font-semibold">Why?</span> {top.reasoning}
            </p>
            <Link
              to="/crop-advisor"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-semibold text-sm hover:opacity-90"
            >
              View Full Plan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[220px] md:min-h-full">
            <img
              src={heroImg}
              alt={`${CROPS[top.cropId].name} field`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-foreground/85 text-background text-xs font-bold">
              {top.matchScore}% Match
            </span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-6">
        <h3 className="text-lg font-bold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction
            to="/crop-advisor"
            label="Plant Advice"
            sub="Get AI crop recommendations"
            icon={Sprout}
            color="cream"
          />
          <QuickAction
            to="/markets"
            label="Market Prices"
            sub="Check prices & trends"
            icon={BarChart3}
            color="sky"
          />
          <QuickAction
            to="/sell"
            label="Sell Produce"
            sub="List your produce for sale"
            icon={ShoppingCart}
            color="peach"
          />
          <QuickAction
            to="/farm-plan"
            label="My Farm Plan"
            sub="View your farming timeline"
            icon={CalendarDays}
            color="lavender"
          />
        </div>
      </section>

      {/* Prices + Weather */}
      <section className="grid lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 rounded-2xl bg-card border border-border p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Market Prices Overview</h3>
            <Link
              to="/markets"
              className="text-xs font-semibold text-success hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 text-xs text-muted-foreground border-b border-border pb-2 mb-2">
            <span>Crop</span>
            <span className="text-right">Price (KES)</span>
            <span className="text-right">Trend (7d)</span>
          </div>
          <div className="flex flex-col">
            {prices.map((p) => {
              const c = CROPS[p.cropId];
              return (
                <div
                  key={p.cropId}
                  className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center py-2.5 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg">{c.emoji}</span>
                    <span className="font-medium truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({p.unitLabel})
                    </span>
                  </div>
                  <span className="font-semibold tabular-nums text-right">
                    {p.current.toLocaleString()}
                  </span>
                  <span className="text-right">
                    <TrendBadge history={p.history} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-4 sm:p-5">
          <h3 className="font-bold mb-3">Weather Today</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">
              <Cloud className="h-14 w-14 text-sky-400 inline" />
            </div>
            <div>
              <p className="text-3xl font-bold">24°C</p>
              <p className="text-xs text-muted-foreground">Partly Cloudy</p>
            </div>
            <div className="ml-auto text-xs space-y-1 text-right">
              <p className="text-muted-foreground">
                Humidity{" "}
                <span className="font-semibold text-foreground ml-1">62%</span>
              </p>
              <p className="text-muted-foreground">
                Rain{" "}
                <span className="font-semibold text-foreground ml-1">20%</span>
              </p>
              <p className="text-muted-foreground">
                Wind{" "}
                <span className="font-semibold text-foreground ml-1">
                  12 km/h
                </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1 text-center">
            {[
              { d: "Wed", t: "22°/13°", I: CloudRain },
              { d: "Thu", t: "25°/14°", I: Sun },
              { d: "Fri", t: "26°/15°", I: Sun },
              { d: "Sat", t: "24°/14°", I: Cloud },
              { d: "Sun", t: "27°/15°", I: Sun },
            ].map(({ d, t, I }) => (
              <div key={d} className="rounded-lg bg-muted/50 py-2">
                <p className="text-[10px] text-muted-foreground">{d}</p>
                <I className="h-5 w-5 mx-auto my-1 text-warning" />
                <p className="text-[10px] font-semibold">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Marketplace */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Latest from Marketplace</h3>
          <Link
            to="/marketplace"
            className="text-xs font-semibold text-success hover:underline"
          >
            View All Listings
          </Link>
        </div>
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No listings available in your area
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 snap-x">
            {listings.map((l) => (
              <div key={l.id} className="w-44 sm:w-52 shrink-0 snap-start">
                <ListingCard listing={l} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className="rounded-2xl bg-card border border-border p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            I: ShieldCheck,
            t: "Trusted Buyers",
            s: "Verified buyers for secure transactions",
          },
          {
            I: Lightbulb,
            t: "Better Decisions",
            s: "AI insights to maximize your profits",
          },
          {
            I: Users,
            t: "Grow Together",
            s: "Join group selling and get better prices",
          },
          {
            I: Headphones,
            t: "Expert Support",
            s: "Get help from our farming experts",
          },
        ].map(({ I, t, s }) => (
          <div key={t} className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
              <I className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="font-semibold text-sm">{t}</p>
              <p className="text-xs text-muted-foreground leading-snug">{s}</p>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
