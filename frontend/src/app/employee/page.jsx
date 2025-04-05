"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Briefcase,
  Plus,
  MoreHorizontal,
  Building2,
  Users,
  BarChart,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

const applicants = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Frontend Developer",
    timeAgo: "2h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    about:
      "I'm a passionate frontend developer with 5+ years of experience building responsive web applications. I specialize in React, TypeScript, and modern CSS frameworks.",
    experience:
      "• Senior Frontend Developer at TechCorp (2020-Present)\n• Frontend Developer at WebSolutions (2018-2020)\n• Junior Developer at StartupXYZ (2016-2018)",
    resumeUrl: "#",
  },
  {
    id: 2,
    name: "Sam Rivera",
    position: "Senior Frontend Developer",
    timeAgo: "5h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=SR",
    about:
      "Full-stack developer with a focus on frontend technologies. I enjoy creating intuitive user interfaces and have experience with large-scale applications.",
    experience:
      "• Lead Developer at InnovateTech (2019-Present)\n• Full-Stack Developer at GlobalSoft (2017-2019)\n• Web Developer Intern at TechStart (2016-2017)",
    resumeUrl: "#",
  },
  {
    id: 3,
    name: "Taylor Kim",
    position: "Senior Frontend Developer",
    timeAgo: "8h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=TK",
    about:
      "Frontend specialist with a background in UX/UI design. I bring both technical skills and design sensibility to create exceptional user experiences.",
    experience:
      "• Frontend Engineer at DesignTech (2021-Present)\n• UI Developer at CreativeSolutions (2018-2021)\n• UX/UI Designer at DigitalAgency (2016-2018)",
    resumeUrl: "#",
  },
  {
    id: 4,
    name: "Jordan Patel",
    position: "Senior Frontend Developer",
    timeAgo: "12h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=JP",
    about:
      "Experienced developer focused on creating accessible, performant web applications. I'm passionate about web standards and modern JavaScript frameworks.",
    experience:
      "• Senior Developer at AccessibleWeb (2020-Present)\n• Frontend Developer at TechInnovate (2018-2020)\n• Web Developer at CodeCraft (2016-2018)",
    resumeUrl: "#",
  },
  {
    id: 5,
    name: "Morgan Lee",
    position: "Senior Frontend Developer",
    timeAgo: "1d ago",
    avatar: "/placeholder.svg?height=40&width=40&text=ML",
    about:
      "Frontend developer with a strong focus on performance optimization and modern JavaScript frameworks. I enjoy solving complex UI challenges.",
    experience:
      "• Performance Engineer at FastWeb (2019-Present)\n• Frontend Developer at OptimizeTech (2017-2019)\n• Junior Developer at WebCraft (2015-2017)",
    resumeUrl: "#",
  },
]

// Sample job postings
const jobPostings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    daysAgo: 1,
    applicants: 25,
    badges: ["Full-time", "Remote"],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    daysAgo: 2,
    applicants: 30,
    badges: ["Full-time", "Hybrid"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    daysAgo: 3,
    applicants: 35,
    badges: ["Full-time", "On-site"],
  },
  {
    id: 4,
    title: "Product Manager",
    daysAgo: 4,
    applicants: 40,
    badges: ["Full-time", "Remote"],
  },
]

// Application Viewer Modal Component
function ApplicationViewer({ applicant }) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={applicant.avatar} alt={applicant.name} />
            <AvatarFallback>
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>{applicant.name}</span>
        </DialogTitle>
        <DialogDescription>
          Applied for: {applicant.position} • {applicant.timeAgo}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-6 px-1 py-2">
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Tell me about yourself</h3>
            <p className="text-sm text-muted-foreground">{applicant.about}</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Relevant Experience</h3>
            <pre className="text-sm text-muted-foreground whitespace-pre-line">{applicant.experience}</pre>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Resume</h3>
            <div className="border rounded-lg p-4 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{applicant.name} - Resume.pdf</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        <Button variant="outline" className="sm:mr-auto">
          <Eye className="h-4 w-4 mr-2" />
          View Full Profile
        </Button>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Contact Applicant</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

export default function Dashboard() {
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  return (
    <div className="flex min-h-screen bg-muted/10">

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Briefcase className="h-5 w-5 text-primary" />
            <span>JobConnect</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>My Jobs</DropdownMenuItem>
                <DropdownMenuItem>Applicants</DropdownMenuItem>
                <DropdownMenuItem>Company Profile</DropdownMenuItem>
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Employer Dashboard</h1>
                <p className="text-muted-foreground">Manage your job postings and applicants</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/post-job">
                  <Button className="gap-1 shadow-sm">
                    <Plus className="h-4 w-4" /> Post a Job
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">+24 in the last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">+5 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Positions Filled</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Recent Activity */}
            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="jobs">Recent Job Postings</TabsTrigger>
                <TabsTrigger value="applicants">Recent Applicants</TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Job Postings</CardTitle>
                    <CardDescription>Your most recent job listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobPostings.map((job) => (
                        <div
                          key={job.id}
                          className="flex items-center justify-between space-x-4 rounded-lg border p-4 shadow-sm"
                        >
                          <div className="space-y-1">
                            <h3 className="font-medium">{job.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>
                                Posted {job.daysAgo} day{job.daysAgo !== 1 ? "s" : ""} ago
                              </span>
                              <span>•</span>
                              <span>{job.applicants} applicants</span>
                            </div>
                            <div className="flex gap-2 mt-1">
                              {job.badges.map((badge) => (
                                <Badge key={badge} variant="outline">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/employer/jobs/${job.id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Job</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/employer/jobs" className="w-full">
                      <Button variant="outline" className="w-full">
                        View All Jobs
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="applicants" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applicants</CardTitle>
                    <CardDescription>Latest candidates who applied to your jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applicants.map((applicant) => (
                        <div key={applicant.id} className="flex items-center gap-4 p-3 rounded-lg border shadow-sm">
                          <Avatar>
                            <AvatarImage src={applicant.avatar} alt={applicant.name} />
                            <AvatarFallback>
                              {applicant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{applicant.name}</p>
                              <span className="text-xs text-muted-foreground">{applicant.timeAgo}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Applied for: {applicant.position}</p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(applicant)}>
                                View Application
                              </Button>
                            </DialogTrigger>
                            <ApplicationViewer applicant={applicant} />
                          </Dialog>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/employer/applicants" className="w-full">
                      <Button variant="outline" className="w-full">
                        View All Applicants
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

