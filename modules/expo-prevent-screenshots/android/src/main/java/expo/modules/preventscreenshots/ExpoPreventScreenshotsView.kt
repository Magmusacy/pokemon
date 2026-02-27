package expo.modules.preventscreenshots

import android.content.Context
import android.view.WindowManager
import android.webkit.WebView
import android.webkit.WebViewClient
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class ExpoPreventScreenshotsView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    val activity = appContext.activityProvider?.currentActivity ?: return

    activity?.runOnUiThread {
      activity.window.addFlags(WindowManager.LayoutParams.FLAG_SECURE);
    }
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    val activity = appContext.activityProvider?.currentActivity ?: return

    activity?.runOnUiThread {
      activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
    }
  }
}
