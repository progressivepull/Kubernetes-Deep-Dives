----
# Permission to access the Docker Socket

```bash
john@debian:~$ docker ps
permission denied while trying to connect to the docker API at unix:///var/run/docker.sock
```
The easiest solution on Debian is to add john to the docker group.

## Step 1. Check whether the Docker group exists

```bash
getent group docker
```

If it exists, continue.

## Step 2. Add john to the Docker group
Run:

```bash
sudo usermod -aG docker john
```

Important: The -aG options add the user to the group without removing existing group memberships.

## Step 3. Activate the new group
Run:

```bash
newgrp docker
```

Alternatively, log out of Debian and log back in.

## Step 4. Test Docker
Run:

```bash
docker ps
```


Also test:

```bash
docker run hello-world
```

Expected result
Docker should now run without the permission-denied error.


## Step 5. Verify permissions
Check your group membership:

```bash
groups
```


You should see docker in the output.

Check the Docker socket:

```bash
ls -l /var/run/docker.sock
```


Expected output resembles:

```
srw-rw---- 1 root docker ... /var/run/docker.sock
```



Security note: Membership in the docker group effectively grants root-level privileges on the machine. Only add trusted users.

If you still get permission denied, send me the output of:

```
groups
ls -l /var/run/docker.sock
sudo systemctl status docker
```

# [README](./../../README.md)