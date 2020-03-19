import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @Autowired
    TestInterface testInterface;

    @GetMapping("/getByFeign")
    public String get() {
        return testInterface.get();
    }
}