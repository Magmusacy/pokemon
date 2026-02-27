import ExpoModulesCore

public class ExpoPreventScreenshotsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoPreventScreenshots")
    View(ExpoPreventScreenshotsView.self) {}
  }
}