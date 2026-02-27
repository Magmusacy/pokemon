import ExpoModulesCore

public class ExpoPreventScreenshotsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoPreventScreenshots")
      
      Events("onChangeTheme")

      Function("setTheme") { (theme: String) -> Void in
          UserDefaults.standard.set(theme, forKey: "theme");
          sendEvent("onChangeTheme", ["theme": theme])
    }
      
      Function("getTheme") {() -> String in UserDefaults.standard.string(forKey: "theme") ?? "system"}
  }
}
