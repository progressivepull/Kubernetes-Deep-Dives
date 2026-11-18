# Complete Uninstallation of WSL on Windows 11

This guide explains how to remove Windows Subsystem for Linux (WSL), installed Linux distributions such as Ubuntu, and the Windows features that support WSL.

> **Important:** Unregistering a Linux distribution permanently deletes its Linux files, applications, settings, and data. Back up anything you need before proceeding.
>
> **Docker warning:** Docker Desktop may use WSL 2. Disabling the Virtual Machine Platform or uninstalling WSL will prevent Docker Desktop from using its WSL 2 backend until WSL is restored.

## Step 1: Open PowerShell as Administrator

1. Open the Start menu.
2. Search for **PowerShell**.
3. Right-click **Windows PowerShell** and select **Run as administrator**.

## Step 2: Check installed WSL distributions

Run:

```powershell
wsl --list --verbose
```

If any distributions remain, note their exact names.

## Step 3: Unregister remaining Linux distributions

Run the command for each distribution you want to remove. For example:

```powershell
wsl --unregister Ubuntu
```

Or, if the distribution is named Ubuntu-24.04:

```powershell
wsl --unregister Ubuntu-24.04
```

Repeat for any other distributions shown in Step 2.

**Warning:** `wsl --unregister` permanently deletes the selected distribution and its data.

## Step 4: Shut down WSL

Run:

```powershell
wsl --shutdown
```

## Step 5: Uninstall WSL

On supported Windows versions, run:

```powershell
wsl --uninstall
```

If this command is unavailable or does not remove the WSL application, continue with the next steps.

## Step 6: Disable Windows optional features

1. Press **Win + R**.
2. Enter:

   ```text
   optionalfeatures
   ```

3. Press Enter.
4. Uncheck these features:
   - **Windows Subsystem for Linux**
   - **Virtual Machine Platform**
5. Select **OK**.
6. Restart Windows when prompted.

**Note:** Do not disable Virtual Machine Platform if you still need another application that depends on it. Docker Desktop's WSL 2 backend requires it.

## Step 7: Uninstall the WSL application

1. Open **Settings**.
2. Select **Apps → Installed apps**.
3. Search for **Windows Subsystem for Linux**.
4. If it is listed, select the three-dot menu and choose **Uninstall**.

You can also uninstall any remaining Ubuntu distribution app listed there.

## Step 8: Check for leftover configuration files (optional)

To open your WSL configuration file (.wslconfig) in Windows, use PowerShell.

Option 1: Open with Notepad
```powershell
notepad "$env:USERPROFILE\.wslconfig"
```


Option 2: Open with Visual Studio Code
```powershell
code "$env:USERPROFILE\.wslconfig"
```


Option 3: Open using the Run dialog
1. Press Win + R.
2. Enter:
%UserProfile%\.wslconfig


3. Press Enter.

If the file doesn't exist, create it using:
```powershell
notepad "$env:USERPROFILE\.wslconfig"
```

**.wslconfig**
```
[wsl2]
memory=10GB
processors=8
swap=4GB
localhostForwarding=true
```


Notepad will ask whether you want to create the file. Select Yes.

After editing .wslconfig, restart WSL to apply the changes:
wsl --shutdown

The following file may contain WSL configuration:

```text
%UserProfile%\.wslconfig
```

You can check whether it exists in PowerShell:

```powershell
Test-Path "$env:USERPROFILE\.wslconfig"
```

If you no longer need its settings, you may delete it:

```powershell
Remove-Item "$env:USERPROFILE\.wslconfig"
```

Only remove this file if you are sure you do not need its configuration.

Ubuntu's application data is normally removed when its distribution is unregistered. Do not manually delete unrelated folders from `AppData\Local\Packages`.

## Step 9: Verify WSL removal

After restarting Windows, open PowerShell and run:

```powershell
wsl --list --verbose
```

Then:

```powershell
wsl --status
```

If WSL has been removed or its Windows feature is disabled, these commands may report that WSL is not installed or that a required optional component is disabled.

You can also verify the Windows optional features:

```powershell
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
Get-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

Look for `State : Disabled` for both features if you intended to disable them.

---

## Optional: Reinstall WSL later

If you want to use WSL again, open PowerShell as Administrator and run:

```powershell
wsl --install
```

Restart Windows if prompted. You can then install a Linux distribution, such as Ubuntu.

## Microsoft documentation

- [WSL basic commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
- [WSL FAQ](https://learn.microsoft.com/en-us/windows/wsl/faq)
- [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

## Suggested order for a clean Docker/WSL reset

If you are resetting WSL to troubleshoot Docker Desktop:

1. Back up any Linux files you need.
2. Unregister the Linux distributions.
3. Uninstall WSL.
4. Disable the WSL and Virtual Machine Platform Windows features.
5. Restart Windows.
6. Reinstall WSL 2 when ready.
7. Restart Windows again.
8. Repair or reinstall Docker Desktop if needed.

Remember that Docker Desktop may store images, containers, and volumes separately. Removing WSL does not necessarily remove all Docker data. Back up important Docker volumes and data before resetting Docker Desktop.
