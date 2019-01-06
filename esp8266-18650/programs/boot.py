import network
import machine
import dht
import webrepl
import urequests
import time

host = 'dorothy_01'

sta_if = network.WLAN(network.STA_IF)
if not sta_if.isconnected():
    print('connecting to network...')
    sta_if.active(True)
    sta_if.connect('Thompson Creek Yacht Club', 'winecountry')
    while not sta_if.isconnected():
        pass
print('network config:', sta_if.ifconfig())

webrepl.start()

d = dht.DHT22(machine.Pin(2)) #, machine.Pin.IN, machine.Pin.PULL_UP))

print("Measuring.")

retry = 0
while retry < 10:
    try:
        d.measure()
        print('Posting')
        break
    except:
        retry = retry + 1
        print(".", end = "")
        time.sleep(2)

if retry < 10:
    c = (d.temperature() * 9/5)
    f = (d.temperature() * 1.8) + 32
    urequests.post("http://192.168.1.46:8086/write?db=home", data="temperature,host=" + host + " value=" + str(f))
    urequests.post("http://192.168.1.46:8086/write?db=home", data="humidity,host=" + host + " value=" + str(d.humidity()))
    print("Done!  Going to deep sleep now.")
else:
    print("Could not read.  Going to deep sleep now.")

#time.sleep(20);

print("Sleepin'")

rtc = machine.RTC()
rtc.irq(trigger=rtc.ALARM0, wake=machine.DEEPSLEEP)

rtc.alarm(rtc.ALARM0, 1000 * 60 * 10)

# put the device to sleep
machine.deepsleep()
