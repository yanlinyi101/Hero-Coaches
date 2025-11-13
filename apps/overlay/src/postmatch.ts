// Overwolf 类型定义（简化版）
declare const overwolf: {
  windows: {
    getCurrentWindow: (callback: (result: { window: { id: string } }) => void) => void;
    close: (windowId: string) => void;
  };
  utils: {
    openUrlInDefaultBrowser: (url: string) => void;
  };
  games: {
    getRunningGameInfo: (callback: (result: { isRunning: boolean }) => void) => void;
  };
};

const REPORT_URL = "http://localhost:3000/report/demo";

// 获取当前窗口 ID（用于关闭）
function getCurrentWindowId(): Promise<string> {
  return new Promise((resolve) => {
    if (typeof overwolf !== "undefined") {
      overwolf.windows.getCurrentWindow((result) => {
        resolve(result.window.id);
      });
    } else {
      // 开发模式：返回假 ID
      resolve("dev-window");
    }
  });
}

// 关闭窗口
async function closeWindow() {
  const windowId = await getCurrentWindowId();
  if (typeof overwolf !== "undefined") {
    overwolf.windows.close(windowId);
  } else {
    // 开发模式：仅关闭浏览器标签
    window.close();
  }
}

// 打开报告页面
function openReport() {
  if (typeof overwolf !== "undefined") {
    overwolf.utils.openUrlInDefaultBrowser(REPORT_URL);
  } else {
    // 开发模式：在新标签打开
    window.open(REPORT_URL, "_blank");
  }
  updateStatus("正在打开报告页面...");
}

// 更新状态
function updateStatus(message: string) {
  const statusEl = document.getElementById("status");
  if (statusEl) {
    statusEl.textContent = message;
    setTimeout(() => {
      statusEl.textContent = "";
    }, 3000);
  }
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
  const viewReportBtn = document.getElementById("viewReport");
  const closeBtn = document.getElementById("close");

  if (viewReportBtn) {
    viewReportBtn.addEventListener("click", () => {
      openReport();
      // 打开后自动关闭窗口
      setTimeout(() => {
        closeWindow();
      }, 500);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeWindow();
    });
  }

  // 开发模式提示
  if (typeof overwolf === "undefined") {
    updateStatus("开发模式：Overwolf API 不可用");
  }
});

