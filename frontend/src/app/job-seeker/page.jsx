import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  Search,
  MoreHorizontal,
  Building2,
  User,
  BarChart,
  FileText,
  Bell,
  Settings,
  LogOut,
  BookmarkCheck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function page() {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Briefcase className="h-5 w-5" />
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
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Find Jobs</DropdownMenuItem>
                <DropdownMenuItem>My Applications</DropdownMenuItem>
                <DropdownMenuItem>Saved Jobs</DropdownMenuItem>
                <DropdownMenuItem>My Profile</DropdownMenuItem>
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
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Your Dashboard</h1>
                <p className="text-muted-foreground">Track your applications and job search progress</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/jobs">
                  <Button className="gap-1">
                    <Search className="h-4 w-4" /> Find Jobs
                  </Button>
                </Link>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track the status of your recent job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { company: "Tech Corp", position: "Senior Frontend Developer", status: "Applied", days: 2 },
                    { company: "Design Studio", position: "UI/UX Designer", status: "Applied", days: 5 },
                    { company: "Software Inc", position: "Full Stack Developer", status: "Applied", days: 1 },
                    { company: "Marketing Agency", position: "Web Developer", status: "Rejected", days: 10 },
                    { company: "Startup XYZ", position: "React Developer", status: "Applied", days: 3 },
                  ].map((application, index) => (
                    <div key={index} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{application.position}</h3>
                          <p className="text-sm text-muted-foreground">{application.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge
                            variant={
                              application.status === "Interview"
                                ? "default"
                                : application.status === "Rejected"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {application.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {application.days} day{application.days !== 1 ? "s" : ""} ago
                          </p>
                        </div>
                        <Link href={`/job-seeker/applications/${index + 1}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

