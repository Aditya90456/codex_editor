
#include <iostream>
#include <map>
#include <string>
#include <nlohmann/json.hpp>
using json = nlohmann::json;
using namespace std;

void log_step(int line, map<string,int> vars, string msg="") {
    json j;
    j["line"] = line;
    j["changed"] = vars;
    j["cout"] = msg;
    cout << "[STEP]" << j.dump() << endl;
}

#define LOG_STEP(vars, msg) log_step(__LINE__, vars, msg)

#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 3; i++) {
        sum += i;
    }
    if (sum > 5) {
        cout << "Big";
    } else {
        cout << "Small";
    }
    return 0;
}
