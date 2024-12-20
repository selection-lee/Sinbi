package c104.sinbi.domain.virtualaccount;

import c104.sinbi.common.constant.BankTypeEnum;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VirtualAccount {

    @Id
    @Column(name = "virtual_account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "account_num", nullable = false)
    private String accountNum;

    @Enumerated(EnumType.STRING)
    @Column(name = "bank_type", nullable = false)
    private BankTypeEnum bankType;

    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "user_name", nullable = false)
    private String userName;
}
