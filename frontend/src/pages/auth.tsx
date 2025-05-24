import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SignUp from "./signup"
import SignIn from "./signin"

export function AuthTabs() {
  return (

    <>
      <div className="h-20 p-5"/>
      <h1 className="scroll-m-20 text-4xl font-bold text-center tracking-tight">Let's get started!</h1>
      <div className="h-5"/>
      <div className="flex flex-col items-center justify-start">
        <Tabs defaultValue="signup" className="w-[350px] md:w-[450px]">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Log In</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sign Up</CardTitle>
                <CardDescription>
                  Let's set you up!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="space-y-1">
                  <SignUp />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Log In</CardTitle>
                <CardDescription>
                  Glad to have you back!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <SignIn />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
