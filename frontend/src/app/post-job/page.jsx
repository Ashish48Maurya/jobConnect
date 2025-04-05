import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase } from "lucide-react"

export default function PostJobPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold">Post a New Job</h1>
            <p className="text-muted-foreground">Fill out the form below to create a new job listing</p>
          </div>
          <div className="space-y-8 ">
            <div className="space-y-4 p-6 border rounded-lg">
              <h2 className="text-xl font-semibold">Job Details</h2>
              <div className="space-y-4 ">
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" placeholder="e.g. Senior Frontend Developer" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select>
                      <SelectTrigger id="job-type">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location-type">Location Type</Label>
                    <Select>
                      <SelectTrigger id="location-type">
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="on-site">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. New York, NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="e.g. Engineering" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">Minimum Salary</Label>
                    <Input id="salary-min" placeholder="e.g. 50000" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary-max">Maximum Salary</Label>
                    <Input id="salary-max" placeholder="e.g. 80000" type="number" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h2 className="text-xl font-semibold">Job Description</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the job role, responsibilities, and requirements."
                    className="min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the skills, qualifications, and experience required for this position."
                    className="min-h-[150px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Describe the benefits and perks offered with this position."
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg">
              <h2 className="text-xl font-semibold">Company Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="e.g. Acme Inc." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Company Website</Label>
                  <Input id="company-website" placeholder="e.g. https://www.acme.com" type="url" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-description">Company Description</Label>
                  <Textarea
                    id="company-description"
                    placeholder="Provide a brief description of your company."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 border rounded-lg ">
              <h2 className="text-xl font-semibold">Application Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="application-deadline">Application Deadline</Label>
                  <Input id="application-deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application-email">Application Email</Label>
                  <Input id="application-email" placeholder="e.g. careers@acme.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application-url">Application URL</Label>
                  <Input id="application-url" placeholder="e.g. https://www.acme.com/careers/apply" type="url" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button>Publish Job</Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container py-4 px-4 md:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobConnect. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

