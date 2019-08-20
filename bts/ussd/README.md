# USSD Gateway

## Data

The following is an outline and general description for the data structure of the gateway.

### User

Users are mobile phones and hopefully the operators that will have sessions tracked in the system.

```c++
struct user {
    
}
```

#### Emergency Severity Index (ESI)
Please read more about it on Wikipedia - [Emergency Severity Index](https://en.wikipedia.org/wiki/Emergency_Severity_Index).

- 1 = Resuscitation
- 2 = Emergent
- 3 = Urgent
- 4 = Less Urgent
- 5 = Nonurgent

##### ESI Classification Questions

- 1 = Are you unable to breath or have massive blood loss? 
- 2 = Are you having chest pains or trouble breathing? 
- 3 = Do you have abdominal pain or a fractured bone? 
- 4 = Are you suffering from minor pain or have lacerations? 
- 5 = Would you consider yourself generally ok and healthy at this time? 

__Example flow:__

Question 1:
```
Is their an immediate threat to your life, medical or otherwise? Call:
*1# for yes
*2# for no
```
- If the user responds `yes` then their information will be forwarded to a qualified medical responder to communicate via SMS, their ESI will be set to `1`, and go to statement 2.
- If the user responds `no` continue to next question.

Question 2:
```
Are you experiencing any medical complications at this time? Call:
*1# for yes
*2# for no
```
- If the user responds `yes` continue to next question.
- If the user responds `no` continue to statement 1.

Question 3:
```
Do you have trouble breathing or major blood loss? Call:
*1# for yes
*2# for no
```
- If the user responds `yes` then their information will be forwarded to a qualified medical responder to communicate via SMS and their ESI will be set to `1`.
- If the user responds `no` continue to next question.

Question 4:
```
Do you have chest pains or major lacerations? Call:
*1# for yes
*2# for no
```
- If the user responds `yes` then their ESI will be set to `2`.
- If the user responds `no` continue to next question.

Question 5:
```
Do you have abdominal pain or a fractured bone? Call:
*1# for yes
*2# for no
```
- If the user responds `yes` then their ESI will be set to `3`.
- If the user responds `no` continue to next question.

Question 6:
```
Do you have minor pain or lacerations? Call:
*1# for yes
*2# for no
```
- If the user responds `yes` then their ESI will be set to `4`.
- If the user responds `no` continue to next question.

Question 7:
```
Do you have any other minor health related issues? Call:
*1# for yes
*2# for no
```
- If the user responds `yes` then their ESI will be set to `5` and go to statement 1.
- If the user responds `no` continue to statement 1.

Statement 1:
```
Thank you, emergency responders have been notified of your general location
and will be with you ASAP.
```

Statement 2:
```
Thank you, we have provided your information to emergency responders.  
Please wait for further instruction.
```
