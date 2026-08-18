import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code2,
  Target,
  Users,
  Zap,
  BookOpen,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | LeetCode",
  description:
    "Learn about our coding practice platform and how it helps developers master problem solving.",
};

const values = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Practice First",
    description:
      "Sharpen your skills with real coding challenges, instant feedback, and a built-in editor.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Structured Growth",
    description:
      "Move from easy to hard problems, track submissions, and measure how you improve over time.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Built for Learners",
    description:
      "Whether you are preparing for interviews or learning algorithms, the platform is designed around you.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Feedback",
    description:
      "Run test cases, review results, and iterate quickly so you can learn from every attempt.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen transition-colors mt-24">
      <section className="flex flex-col justify-center items-center px-4 pt-16 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-8 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            About the platform
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            A place to{" "}
            <span className="text-amber-600 dark:text-amber-400">
              master coding
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This LeetCode-inspired platform helps developers practice algorithms,
            track progress, and prepare for technical interviews with interactive
            problems, playlists, and real-time execution results.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="hover:shadow-lg transition-shadow duration-200 border-gray-200 dark:border-gray-700"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      index % 2 === 0
                        ? "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400"
                        : "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {value.icon}
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-neutral-900/50 rounded-md">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-6 text-amber-500 dark:text-amber-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to start solving?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Browse the problem set, create playlists, and keep a record of every
            submission as you grow.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 text-white dark:text-gray-900"
          >
            <Link href="/problems">Browse Problems</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
