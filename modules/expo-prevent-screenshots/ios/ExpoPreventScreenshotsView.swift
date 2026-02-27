import ExpoModulesCore
import UIKit

class ExpoPreventScreenshotsView: ExpoView {
  private var secureTextField: UITextField?
  private weak var attachedWindow: UIWindow?

  override func willMove(toWindow newWindow: UIWindow?) {
    super.willMove(toWindow: newWindow)
    
    if let window = newWindow {
      enableScreenshotProtection(on: window)
    } else {
      disableScreenshotProtection()
    }
  }

  private func enableScreenshotProtection(on window: UIWindow) {
    guard secureTextField == nil else {return}
    let field = UITextField()
    field.isSecureTextEntry = true

    let view = UIView(frame: UIScreen.main.bounds)
    let image = UIImageView(image: UIImage())
    image.frame = UIScreen.main.bounds
    image.backgroundColor = .black
    window.addSubview(field)
    view.addSubview(image)

    if let superlayer = window.layer.superlayer {
        superlayer.addSublayer(field.layer)
        if let lastLayer = field.layer.sublayers?.last {
            lastLayer.addSublayer(window.layer)
        }
    }

    field.leftView = view
    field.leftViewMode = .always
    
    self.secureTextField = field
    self.attachedWindow = window
  }

  private func disableScreenshotProtection() {
    guard let field = secureTextField, let window = attachedWindow else { return }

    field.layer.superlayer?.addSublayer(window.layer)
    field.removeFromSuperview()
    
    self.secureTextField = nil
    self.attachedWindow = nil
  }
}
