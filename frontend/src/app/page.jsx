import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, CheckCircle, ArrowRight, Star, Shield, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <span className="text-xs">🚀 The #1 Job Platform</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Connect With Your <span className="text-primary">Dream Career</span>
                </h1>
                <p className="text-muted-foreground md:text-xl max-w-[600px]">
                  Thousands of jobs from top companies. Find opportunities that match your skills and aspirations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/jobs" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full gap-2">
                      Find Jobs <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/post-job" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full">
                      Post a Job
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>10k+ Companies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>25k+ Jobs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>50k+ Candidates</span>
                  </div>
                </div>
              </div>
              <div className="relative lg:h-[500px] h-[300px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/team.jpg"
                  alt="Professional team in a modern office"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Leading Companies
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
                Join thousands of companies that have found their perfect candidates through our platform.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
              {[1, 2, 3, 4, 5, 6].map((logo) => (
                <div key={logo} className="h-12 w-32 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted rounded">
                    <span className="text-muted-foreground font-medium">Company {logo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  For Job Seekers
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Find Your Next Opportunity</h2>
                <p className="text-muted-foreground md:text-xl">
                  Access thousands of job listings, track your applications, and get discovered by top employers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Create a professional profile to showcase your skills</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Apply to jobs with a single click</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Track all your applications in one dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Get notified when employers view your profile</span>
                  </li>
                </ul>

              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/seeker.jpg"
                  alt="Job seeker using laptop"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
                <Image
                  src="/employee.jpg"
                  alt="Employer reviewing applications"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  For Employers
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Hire the Best Talent</h2>
                <p className="text-muted-foreground md:text-xl">
                  Post jobs, review applications, and connect with qualified candidates all in one place.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Post unlimited job listings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Access our database of qualified candidates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Manage all applications through your dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>Get analytics on your job postings' performance</span>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose JobConnect</h2>
              <p className="text-muted-foreground md:text-xl max-w-[800px] mx-auto">
                Our platform offers unique features designed to make the job search and hiring process seamless.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Matches</h3>
                <p className="text-muted-foreground">
                  Our AI-powered matching algorithm ensures you only see relevant opportunities or candidates.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
                <p className="text-muted-foreground">
                  All companies and job listings are verified to ensure a safe and trustworthy experience.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Time-Saving</h3>
                <p className="text-muted-foreground">
                  Streamlined application process and powerful filtering save time for both parties.
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  Join a community of professionals and companies committed to growth and excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Ready to Transform Your Career or Hiring Process?
            </h2>
            <p className="max-w-[800px] mx-auto text-primary-foreground/90 md:text-xl mb-8">
              Join thousands of job seekers and employers who have found success with JobConnect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  Create an Account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 md:justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Briefcase className="h-6 w-6" />
              <span>JobConnect</span>
            </div>
            <nav className="flex gap-6">
              <Link href="/jobs" className="text-sm font-medium hover:underline underline-offset-4">
                Jobs
              </Link>
              <Link href="/employee" className="text-sm font-medium hover:underline underline-offset-4">
                Dashborad
              </Link>
              <Link href="/post-job" className="text-sm font-medium hover:underline underline-offset-4">
                Post Job
              </Link>
              <Link href="/job-seeker" className="text-sm font-medium hover:underline underline-offset-4">
                My Applications
              </Link>
            </nav>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} JobConnect. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

